/**
 * This file must be at this exact path, because when modes are imported in ./all.js,
 * they reference '../../lib/codemirror' as they expect to be inside node_modules.
 */

module.exports = require('./codemirror/codemirror').default
