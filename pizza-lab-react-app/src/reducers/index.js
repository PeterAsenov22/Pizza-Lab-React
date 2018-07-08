import ajaxStatusReducer from './ajaxStatusReducer'
import statsReducer from './statsReducer'
import {productsReducer, createProductReducer, createProductErrorReducer} from './productsReducer'
import {registerReducer, loginReducer, registerErrorReducer, loginErrorReducer} from './authReducer'

export default {
  register: registerReducer,
  login: loginReducer,
  products: productsReducer,
  registerError: registerErrorReducer,
  loginError: loginErrorReducer,
  createProduct: createProductReducer,
  createProductError: createProductErrorReducer,
  ajaxCalls: ajaxStatusReducer,
  stats: statsReducer
}
