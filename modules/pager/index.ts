
type PagerState<T> = {
  itemsPerPage: number
  currentPage: number
  totalPages: number
  items: T[]
}

