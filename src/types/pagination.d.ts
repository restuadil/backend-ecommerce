export type IPagination = {
  totalData: number;
  limit: number;
  currentPage: number;
  totalPage: number;
};

export type IPageAble<Type> = {
  response: Array<Type>;
  pagination: pagination;
};
