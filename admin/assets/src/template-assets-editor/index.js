/**
 * Template assets
 *
 * @see /includes/template/assets
 */
import { render } from 'react'
import AssetsEditor from './AssetsEditor'

const { jQuery: $ } = window

const el = document.getElementById('tangible_template_assets_editor')

let assets = $(el).data('assets')
if (!Array.isArray(assets)) assets = []

render(<AssetsEditor assets={assets} />, el)
