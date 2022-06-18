
/**
 * Arguments to the loop
 */
type LoopArguments = {
  [key: string]: any
}

/**
 * Query arguments generated
 */
type LoopQueryArguments = {
  [key: string]: any
}

/**
 * Query instance for internal use
 *
 * Can be class instance, array of items, or even the original arguments, if items were manually passed.
 */
type LoopQuery = any

/**
 * Loop item
 */
type LoopItem = any

/**
 * Callback for loop, each, map, reduce
 */
type LoopCallback = (item: LoopItem) => any

/**
 * Loop interface with query, items, cursor, field, pagination
 *
 * All loops implement this by extending the class Tangible\Loop\BaseLoop, and providing
 * WP_Query, WP_User_Query, WP_Taxonomy, or arbitrary items.
 */
interface Loop {
  /**
   * Crete query arguments from passed arguments
   */
  create_query_args: ( args: LoopArguments ) => LoopQueryArguments
  /**
   * Crete query
   */
  create_query: ( query_args: LoopQueryArguments ) => LoopQuery
  /**
   * Run query
   */
  run_query: ( args: LoopArguments ) => LoopQuery
  /**
   * Get items from query
   */
  get_items_from_query: ( query: LoopQuery ) => LoopItem[]

  /**
   * Loop over items
   */
  loop:   ( fn: LoopCallback ) => any
  /**
   * Loop over each item (alias of loop)
   */
  each:   ( fn: LoopCallback ) => any
  /**
   * Map items to a new array
   */
  map:    ( fn: LoopCallback ) => any
  /**
   * Reduce items to a value
   */
  reduce: ( fn: LoopCallback, accumulator: any ) => any

  /**
   * Get current item
   */
  get_current: () => LoopItem
  /**
   * Set current item
   */
  set_current: ( item: LoopItem ) => LoopItem
  /**
   * Move cursor/index forward
   */
  next: () => void
  /**
   * Has next item
   */
  has_next: () => boolean
  /**
   * Reset loop
   */
  reset: () => void

  /**
   * Get field
   */
  get_field: ( field_name: string, args?: any[] ) => any

  /**
   * Get paginated items
   */
  get_items: () => LoopItem[]
  /**
   * Get paginated items count
   */
  get_items_count: () => number
  /**
   * Get items per page (size of page)
   */
  get_items_per_page: () => number

  /**
   * Get current page number
   */
  get_current_page: () => number
  /**
   * Set current page
   */
  set_current_page: ( current_page: number ) => void
  /**
   * Get paginated items
   */
  get_current_page_items: () => LoopItem[]

  /**
   * Get total items (no pagination)
   */
  get_total_items: () => LoopItem[]
  /**
   * Get total items count (no pagination)
   */
  get_total_items_count: () => number
  /**
   * Get total number of pages
   */
  get_total_pages: () => number
}
