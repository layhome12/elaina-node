type PaginateInput = {
  page: number;
  limit: number;
};

type PaginateOutput = {
  items: any[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
