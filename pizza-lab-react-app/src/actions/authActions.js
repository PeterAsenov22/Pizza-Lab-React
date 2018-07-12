import { REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED, LOGOUT_SUCCESS } from './actionTypes'
import {beginAjax, endAjax} from './ajaxStatusActions'
import { login, register } from '../api/remote'
import errorHandler from '../utils/errorHandler'

function registerSuccess () {
  return {
    type: REGISTER_SUCCESS
  }
}

function registerError (error) {
  return {
    type: REGISTER_ERROR,
    error
  }
}

function loginSuccess () {
  return {
    type: LOGIN_SUCCESS
  }
}

function loginError (error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

function redirectAction () {
  return {
    type: REDIRECTED
  }
}

function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  }
}

function registerAction (username, email, password) {
  return (dispatch) => {
    dispatch(beginAjax())
    return register(username, email, password)
      .then(json => {
        if (json.success) {
          dispatch(registerSuccess())
        } else {
          const error = errorHandler(json)
          dispatch(registerError(error))
        }
        dispatch(endAjax())
      })
  }
}

function loginAction (email, password) {
  return (dispatch) => {
    dispatch(beginAjax())
    return login(email, password)
      .then(json => {
        if (json.success) {
          authenticateUser(json)
          dispatch(loginSuccess())
        } else {
          const error = errorHandler(json)
          dispatch(loginError(error))
        }
        dispatch(endAjax())
      })
  }
}

function logoutAction () {
  return (dispatch) => {
    deauthenticateUser()
    dispatch(logoutSuccess())
  }
}

function authenticateUser (json) {
  window.localStorage.setItem('authToken', json.token)
  window.localStorage.setItem('username', json.user.username)
  if (json.user.roles && json.user.roles.length > 0) {
    window.localStorage.setItem('roles', json.user.roles)
  }
}

function deauthenticateUser () {
  window.localStorage.clear()
}

export {
  registerAction,
  loginAction,
  logoutAction,
  redirectAction
}
