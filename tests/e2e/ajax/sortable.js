import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useAuthedAjax } from './utils.js'
import { wp } from '../../wp.js'

const { describe } = test

const REORDER = 'tangible_sortable_post_type__update_menu_order'

const orderPost = (slug) => {

  const [id, order] = wp(
    `eval '$p=get_page_by_path("${slug}",OBJECT,"post");echo $p->ID.":".$p->menu_order;'`,
  )
    .trim()
    .split(':')

  return { id: Number(id), order: Number(order) }
}

const setOrder = (slug, order) =>
  wp(
    `eval '$p=get_page_by_path("${slug}",OBJECT,"post");wp_update_post(["ID"=>$p->ID,"menu_order"=>${order}]);'`,
  )

/**
 * update_menu_order reorders posts. These check an admin can reorder but a
 * subscriber cannot.
 *
 * A known order is set in-test so the checks are stable under retries.
 *
 * @see admin/post-types/sortable-post-type/class-sortable-post-type.php
 */
describe('AJAX permission: update_menu_order', () => {

  const admin = useAuthedAjax('admin', 'password')
  const subscriber = useAuthedAjax('e2e_subscriber', 'e2e-sub-pass')

  const reorder = async (ajax) => {

    setOrder('e2e-order-a', 10)
    setOrder('e2e-order-b', 20)

    const a = orderPost('e2e-order-a')
    const b = orderPost('e2e-order-b')

    await ajax.post({ action: REORDER, order: `post[]=${b.id}&post[]=${a.id}` })

    return { before: a.order, after: orderPost('e2e-order-a').order }
  }

  test('lets an administrator reorder posts', async () => {

    const { before, after } = await reorder(admin)
    expect(after).not.toBe(before)
  })

  test('does not let a subscriber reorder posts', async () => {

    const { before, after } = await reorder(subscriber)
    expect(after).toBe(before)
  })
})
