import ajaxStatusReducer from './ajaxStatusReducer'
import statsReducer from './statsReducer'
import cartReducer from './cartReducer'
import ordersReducer from './ordersReducer'
import {productsReducer, createProductReducer, createProductErrorReducer, createReviewErrorReducer} from './productsReducer'
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
  stats: statsReducer,
  createReviewError: createReviewErrorReducer,
  cart: cartReducer,
  orders: ordersReducer
}
