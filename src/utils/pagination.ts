export const Pagination = (totalCount: number, page: number, limit: number) => {
  return {
    totalData: totalCount,
    limit,
    currentPage: page,
    totalPage: Math.ceil(totalCount / limit),
  };
};
