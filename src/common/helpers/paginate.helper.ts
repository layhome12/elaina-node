import { Knex } from "knex";

export default class KnexPaginator {
  static async result<T = any>(
    baseQuery: Knex.QueryBuilder,
    pageIn: PaginateInput,
  ): Promise<PaginateOutput> {
    const currentPage = pageIn.page < 1 ? 1 : pageIn.page;
    const limit = pageIn.limit > 0 ? pageIn.limit : 10;
    const perPage = limit > 100 ? 100 : limit;
    const offset = (currentPage - 1) * perPage;

    const dataQuery = baseQuery.clone().limit(perPage).offset(offset);
    const countQuery = baseQuery
      .clone()
      .clearSelect()
      .clearOrder()
      .count<{ count: number }>("* as count")
      .first();

    const [items, countResult] = await Promise.all([dataQuery, countQuery]);
    const totalItems = Number(countResult?.count || 0);
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      items: items as T[],
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: perPage,
        currentPage,
        totalPages,
      },
    };
  }
}
