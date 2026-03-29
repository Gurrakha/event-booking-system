/**
 * Pagination and sorting options typically received from request query params.
 */
export type PaginationOptions = {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: string;
};

/**
 * Normalized and computed pagination values used internally.
 */
type OptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

/**
 * Calculates pagination and sorting parameters from raw input options.
 */
const calculatePagination = (options: PaginationOptions): OptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sort_by || 'id';
  const sortOrder = options.sort_order || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePagination;
