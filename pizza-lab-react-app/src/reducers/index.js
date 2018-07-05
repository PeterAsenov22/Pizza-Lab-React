import {registerReducer, loginReducer, registerErrorReducer, loginErrorReducer} from './authReducer'

export default {
  register: registerReducer,
  login: loginReducer,
  registerError: registerErrorReducer,
  loginError: loginErrorReducer
}
