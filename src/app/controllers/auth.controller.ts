import { Request, Response as ExResponse } from "express";
import Response from "../../common/helpers/response.helper";
import { UserService } from "../services/users.service";
import Hash from "../../common/helpers/hash.helper";
import Auth from "../../common/helpers/auth.helper";

export class AuthController {
  static async index(req: Request, res: ExResponse): Promise<Response> {
    const body = req.body;
    const user = await UserService.findByEmail(body.email);

    // -- not found
    if (!user) {
      return Response.http(res, 404, "Incorrect email or password");
    }

    // -- compare password
    if (!Hash.compare(body.password, user.password)) {
      return Response.http(res, 404, "Incorrect email or password");
    }

    // -- blocked
    if (user.is_blocked) {
      return Response.http(res, 403, "Account has been blocked");
    }

    // -- access token
    const token = Auth.jwtSign(
      {
        gid: user.group_id,
        uid: user.id,
      },
      "10m",
    );

    // -- refresh token
    const life = body.remember === true ? 30 : 1;
    const refresh = Auth.jwtRefresh(
      {
        gid: user.group_id,
        uid: user.id,
      },
      `${life} days`,
    );

    // -- cookie
    res.cookie("x-token", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: life * 24 * 60 * 60 * 1000,
    });

    return Response.http(res, 200, "Login successful", {
      type: "Bearer",
      token,
    });
  }

  static async refresh(req: Request, res: ExResponse): Promise<Response> {
    const auth = req['user'] as JwtPayload;

    if (!auth) {
      return Response.http(res, 401, "Unauthorized");
    }

    // -- new access token
    const token = Auth.jwtSign(
      {
        gid: auth.gid,
        uid: auth.uid,
      },
      "10m",
    );

    return Response.http(res, 200, "Refresh authentication successful", {
      type: "Bearer",
      token,
    });
  }

  static async logout(_: Request, res: ExResponse): Promise<Response> {
    res.clearCookie("x-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return Response.http(res, 200, "Logout successful");
  }
}
