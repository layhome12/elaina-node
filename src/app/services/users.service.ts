import Dates from "../../common/helpers/date.helper";
import KnexPaginator from "../../common/helpers/paginate.helper";
import { db } from "../../config/database.config";

export class UserService {
  private static table = "users";

  static async active(id: number) {
    const user = await db(this.table)
      .where({
        id: Number(id),
        activation_status: true,
        is_blocked: false,
      })
      .first();

    return Boolean(user);
  }

  static async findAll(
    pageIn: PaginateInput,
    search: string,
  ): Promise<PaginateOutput> {
    const query = db("users as us")
      .innerJoin("groups as gr", "us.group_id", "gr.id")
      .whereNotIn("us.group_id", [1])
      .andWhere(function () {
        this.where("us.name", "like", `%${search}%`).orWhere(
          "us.username",
          "like",
          `%${search}%`,
        );
      })
      .select([
        "us.id",
        "gr.name as group",
        "us.name",
        "us.username",
        "us.picture",
      ])
      .orderBy("us.created_at", "desc");

    return await KnexPaginator.result(query, pageIn);
  }

  static async findByEmail(email: string) {
    return db(this.table).where({ email }).first();
  }

  static async findById(id: number) {
    const result = await db("users as us")
      .innerJoin("groups as gr", "us.group_id", "gr.id")
      .where("us.id", id)
      .whereNotIn("us.group_id", [1])
      .select([
        "us.id",
        "us.name",
        "us.email",
        "us.username",
        "us.picture",
        "us.biodata",
        "us.is_blocked",
        "us.created_at",
        "gr.id as group_id",
        "gr.name as group_name",
      ])
      .first();

    if (!result) {
      return result;
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      username: result.username,
      picture: result.picture,
      biodata: result.biodata,
      is_blocked: result.is_blocked,
      created_at: result.created_at,
      groups: {
        id: result.group_id,
        name: result.group_name,
      },
    };
  }

  static async emailIsExist(email: string, id?: number) {
    const query = db("users").where({ email });

    if (id) {
      query.andWhereNot("id", id);
    }

    const result = await query.first();
    return !!result;
  }

  static async create(body: UserSave) {
    return db("users").insert({
      ...body,
      activation_code: "000000",
      activation_status: true,
      created_at: Dates.now(),
    });
  }

  static async update(body: UserSave, id: number) {
    return db("users").where("id", id).whereNotIn("group_id", [1]).update(body);
  }

  static async delete(id: number) {
    return db("users").where("id", id).whereNotIn("group_id", [1]).delete();
  }
}
