import {REGISTER_SUCCESS, LOGIN_SUCCESS, REGISTER_ERROR, LOGIN_ERROR, REDIRECTED} from '../actions/actionTypes'

export function registerReducer (state = {success: false}, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {success: true})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {success: false})
    case REDIRECTED:
      return Object.assign({}, state, {success: false})
    default:
      return state
  }
}

export function loginReducer (state = {success: false}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {success: true})
    case REDIRECTED:
      return Object.assign({}, state, {success: false})
    default:
      return state
  }
}

export function registerErrorReducer (state = {hasError: false, message: ''}, action) {
  switch (action.type) {
    case REGISTER_ERROR:
      return Object.assign({}, state, {hasError: true, message: action.message})
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {hasError: false, message: ''})
    default:
      return state
  }
}

export function loginErrorReducer (state = {hasError: false, message: ''}, action) {
  switch (action.type) {
    case LOGIN_ERROR:
      return Object.assign({}, state, {hasError: true, message: action.message})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {hasError: false, message: ''})
    default:
      return state
  }
}
