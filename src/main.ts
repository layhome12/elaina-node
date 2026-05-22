import express, { Application, Response as ExResponse } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import limiter from "express-rate-limit";
import cookies from "cookie-parser";

import routes from "./routes/main.route";
import Logger from "./common/helpers/logger.helper";
import Response from "./common/helpers/response.helper";
import { prefixUrl } from "./config/prefix.config";

// load env
dotenv.config({
  override: true,
  quiet: true,
});

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.set("trust proxy", 1);

    this.plugins();
    this.routes();
    this.errorHandler();
  }

  private plugins(): void {
    const corsOrigin: string | undefined = process.env.CORS_ORIGIN;
    const throttler = limiter({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        statusCode: 429,
        message: "Too many requests",
      },
      skip: (req) => req.method === "OPTIONS",
    });

    this.app.use(
      cors({
        origin: !corsOrigin ? ["*"] : corsOrigin.trim().split(","),
        credentials: true,
      }),
    );

    this.app.use(cookies());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(throttler);

    // -- route logger
    if (process.env.NODE_ENV !== "production") {
      this.app.use(
        morgan("dev", {
          stream: {
            write: (message: string) => {
              Logger.info(message.trim());
            },
          },
        }),
      );
    }
  }

  private routes(): void {
    this.app.use(`/${prefixUrl}`, routes);
  }

  private errorHandler(): void {
    // -- 404
    this.app.use((_, res) => {
      return Response.http(res, 404, "Not found");
    });

    // -- invalid json
    this.app.use((err: any, _: any, res: ExResponse, next: any) => {
      if (err instanceof SyntaxError && "body" in err) {
        return Response.http(res, 422, "Invalid JSON format");
      }

      next(err);
    });

    // -- error handler
    this.app.use((err: any, _: any, res: any) => {
      Logger.error("Internal Server Error", err);
      return Response.http(res, 500, "Internal Server Error");
    });
  }
}

const app = new App().app;
const port = 5000;

app.listen(port, () => {
  Logger.info(`Server running on http://localhost:${port}`);
});
