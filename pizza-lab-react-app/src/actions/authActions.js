import { REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED } from './actionTypes'
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

function registerAction (username, email, password) {
  return (dispatch) => {
    return register(username, email, password)
      .then(json => {
        if (json.success) {
          dispatch(registerSuccess())
        } else {
          const error = errorHandler(json)
          dispatch(registerError(error))
        }
      })
  }
}

function loginAction (email, password) {
  return (dispatch) => {
    return login(email, password)
      .then(json => {
        if (json.success) {
          authenticateUser(json)
          dispatch(loginSuccess())
        } else {
          const error = errorHandler(json)
          dispatch(loginError(error))
        }
      })
  }
}

function logoutAction () {
  return (dispatch) => {
    deauthenticateUser()
  }
}

function authenticateUser (json) {
  window.localStorage.setItem('authToken', json.token)
  window.localStorage.setItem('username', json.user.name)
  if (json.user.roles) {
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
