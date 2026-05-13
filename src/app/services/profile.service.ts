import Dates from "../../common/helpers/date.helper";
import Safety from "../../common/helpers/safety.helper";
import { db } from "../../config/database.config";

export class ProfileService {
  static async findOne(id: number) {
    id = Safety.number(id);

    const row = await db("users as u")
      .innerJoin("groups as g", "u.group_id", "g.id")
      .select([
        "u.id",
        "u.name",
        "u.email",
        "u.username",
        "u.picture",
        "u.biodata",
        "g.name as group_name",
      ])
      .where("u.id", id)
      .first();

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      username: row.username,
      picture: row.picture,
      biodata: row.biodata,
      groups: {
        name: row.group_name,
        emblem: row.group_emblem,
      },
    };
  }

  static async update(data: ProfileSave, id: number): Promise<void> {
    id = Safety.number(id);

    await db("users")
      .where({ id })
      .update({
        ...data,
        updated_at: Dates.now(),
      });
  }
}
