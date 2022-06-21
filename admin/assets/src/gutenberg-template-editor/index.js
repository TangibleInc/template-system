import './blocks/template'

const { wp } = window
const {
  blocks: { registerBlockCollection },
} = wp

/**
 * Register block collection "Tangible"
 *
 * Feature is available from WP 5.4
 * @see https://make.wordpress.org/core/2020/02/27/block-collections
 */

if (registerBlockCollection) {
  registerBlockCollection('tangible', {
    title: 'Tangible',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 99">
        <path d="M0 0 H 33 V 33 H 0 L 0 0" fill="#262262" />
        <path d="M33 0 H 66 V 33 H 33 L 33 0" fill="#662d91" />
        <path d="M66 0 H 99 V 33 H 66 L 66 0" fill="#9f1f63" />

        <path d="M0 33 H 33 V 66 H 0 L 0 33" fill="#2e3192" />
        <path d="M66 33 H 99 V 66 H 66 L 66 33" fill="#ec008c" />

        <path d="M33 66 H 66 V 99 H 33 L 33 66" fill="#02aeef" />
      </svg>
    ),
  })
}
