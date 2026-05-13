import { Request, Response as ExResponse } from "express";
import Response from "../../common/helpers/response.helper";
import Hash from "../../common/helpers/hash.helper";
import { UserService } from "../services/users.service";
import Safety from "../../common/helpers/safety.helper";
import Random from "../../common/helpers/random.helper";

export class UsersController {
  static async index(req: Request, res: ExResponse): Promise<Response> {
    const page = Safety.number(req.query.page as string);
    const limit = Safety.number(req.query.limit as string);
    const search = (req.query.search as string) || "";

    const data = await UserService.findAll({ page, limit }, search);
    return Response.http(res, 200, "Fetch users successful", data);
  }

  static async show(req: Request, res: ExResponse): Promise<Response> {
    const id = Safety.number(req.params.id as string);
    const user = await UserService.findById(id);

    if (!user) {
      return Response.http(res, 404, "User not found");
    }

    return Response.http(res, 200, "Getting users successful", user);
  }

  static async store(req: Request, res: ExResponse): Promise<Response> {
    const body = req.body;

    const auth: JwtPayload = req["user"] as JwtPayload;
    const username = `${body.name.replaceAll(" ", "").toLowerCase()}@${Random.string(3)}`;

    // -- save users
    try {
      await UserService.create({
        group_id: body.group_id,
        name: body.name,
        email: body.email,
        username: username,
        password: Hash.make(body.password),
        picture: null,
        biodata: body.biodata,
      } as UserSave);

      return Response.http(res, 201, "Save users successful");
    } catch (error) {
      return Response.http(res, 500, "Something wrong when save users");
    }
  }

  static async update(req: Request, res: ExResponse): Promise<Response> {
    const body = req.body;
    const id = Safety.number(req.params.id as string);

    const auth: JwtPayload = req["user"] as JwtPayload;
    const isExist = await UserService.emailIsExist(body.email, id);

    if (isExist) {
      return Response.httpBadReq(res, 400, [
        {
          property: "email",
          message: "email is already exists",
        },
      ]);
    }

    let dataSave: UserSave | object = {
      group_id: body.group_id,
      name: body.name,
      email: body.email,
      biodata: body.biodata,
    };

    // -- hash
    if (body.password != null) {
      dataSave["password"] = Hash.make(body.password);
    }

    // -- save
    try {
      await UserService.update(dataSave as UserSave, id);
      return Response.http(res, 200, "Updating users successful");
    } catch (error) {
      return Response.http(res, 500, "Something wrong when update users");
    }
  }

  static async destroy(req: Request, res: ExResponse): Promise<Response> {
    const id = Safety.number(req.params.id as string);

    try {
      await UserService.delete(id);
      return Response.http(res, 200, "Removing users successful");
    } catch (error) {
      return Response.http(res, 200, "Something wrong when remove users");
    }
  }
}
