import { Request, Response as ExResponse } from "express";
import Response from "../../common/helpers/response.helper";
import Hash from "../../common/helpers/hash.helper";
import { ProfileService } from "../services/profile.service";
import { UserService } from "../services/users.service";

export class ProfileController {
  static async index(req: Request, res: ExResponse) {
    try {
      const auth = req["user"] as JwtPayload;
      const profile = await ProfileService.findOne(auth.uid);

      if (!profile) {
        return Response.http(res, 404, "Profile not found");
      }

      // remove id
      delete profile.id;

      return Response.http(res, 200, "Getting profile successful", profile);
    } catch (err) {
      return Response.http(res, 500, "Failed to get profile");
    }
  }

  static async update(req: Request, res: ExResponse) {
    try {
      const auth = req["user"] as JwtPayload;
      const body = req.body;

      // -- email check
      const isExist = await UserService.emailIsExist(body.email, auth.uid);
      if (isExist) {
        return Response.http(res, 400, "Validation error", [
          {
            property: "email",
            message: "Email is already exists",
          },
        ]);
      }

      let dataSave: any = {
        name: body.name,
        email: body.email,
        biodata: body.biodata,
      };

      // -- hash
      if (body.password != null) {
        dataSave.password = Hash.make(body.password);
      }

      // -- save
      await ProfileService.update(dataSave, auth.uid);

      return Response.http(res, 200, "Updating profile successful");
    } catch (err) {
      return Response.http(res, 500, "Something wrong when save profile");
    }
  }
}
