import {registerReducer, loginReducer, registerErrorReducer, loginErrorReducer} from './authReducer'
import ajaxStatusReducer from './ajaxStatusReducer'
import {productsReducer, createProductReducer, createProductErrorReducer} from './productsReducer'

export default {
  register: registerReducer,
  login: loginReducer,
  products: productsReducer,
  registerError: registerErrorReducer,
  loginError: loginErrorReducer,
  createProduct: createProductReducer,
  createProductError: createProductErrorReducer,
  ajaxCalls: ajaxStatusReducer
}
