import { Request, Response as ExResponse, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/users.service";
import Response from "../../common/helpers/response.helper";

export const reAuthGuard = () => {
  return async (req: Request, res: ExResponse, next: NextFunction) => {
    const cookie = req.cookies?.["x-token"];

    if (!cookie) {
      return Response.http(res, 401, "Unauthorized");
    }

    try {
      const key = process.env.JWT_SECRET_KEY + process.env.JWT_SALT_KEY;
      const payload = jwt.verify(cookie, key || "secret+salt") as {
        uid: number;
        gid: number;
      };

      // -- check user active
      const isActive = await UserService.active(payload.uid);
      if (!isActive) {
        return Response.http(res, 401, "Unauthorized");
      }

      // -- attach user to request
      req["user"] = payload;

      next();
    } catch (err) {
      return Response.http(res, 401, "Unauthorized");
    }
  };
};
