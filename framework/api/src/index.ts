import { createAction } from './action'
import { getFormData } from './form'

// From server side
const api = window.Tangible.API
const action = createAction(api)

Object.assign(api, {
  action,
  getFormData
})
