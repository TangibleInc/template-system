/**
 * Template assets
 *
 * @see /includes/template/assets
 */
import React from 'react'
import { createRoot } from 'react-dom'
import AssetsEditor from './AssetsEditor'

const { jQuery: $ } = window

const el = document.getElementById('tangible_template_assets_editor')

let assets = $(el).data('assets')
if (!Array.isArray(assets)) assets = []

createRoot(el).render(<AssetsEditor assets={assets} />)
