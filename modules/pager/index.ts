
type PaginatedData<T> = {
  itemsPerPage: number
  currentPage: number
  totalPages: number
  results: T[]
}

