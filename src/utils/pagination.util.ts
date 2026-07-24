/**
 * Pagination utility — shared helper for computing paginated query params.
 */

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Parse pagination values from a raw query object.
 * Falls back to defaults: page=1, limit=10.
 */
export function parsePagination(query: Record<string, any>): {
  page: number;
  limit: number;
  offset: number;
} {
  const page = Math.max(1, parseInt(query?.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query?.limit) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Build the standard pagination meta object.
 */
export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
