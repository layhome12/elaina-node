import { Request, Response as ExResponse, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/users.service";
import Response from "../../common/helpers/response.helper";

const AuthValidation = () => {
  return async (req: Request, res: ExResponse, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const [type, token] = authHeader?.split(" ") ?? [];

    if (type !== "Bearer" || !token) {
      return Response.http(res, 401, "Unauthorized");
    }

    try {
      const key = process.env.JWT_SECRET_KEY ?? "secret";
      const payload = jwt.verify(token, key) as JwtPayload;

      // -- add in here
      // something another role validation

      const isActive = await UserService.active(payload.uid);
      if (!isActive) {
        return Response.http(res, 403, "Account has been blocked");
      }

      req["user"] = payload;

      next();
    } catch {
      return Response.http(res, 401, "Unauthorized");
    }
  };
};

export const AuthGuard = AuthValidation();
