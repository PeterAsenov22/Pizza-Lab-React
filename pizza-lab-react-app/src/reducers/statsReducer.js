import {FETCH_STATS_SUCCESS, REGISTER_SUCCESS, CREATE_PIZZA_SUCCESS, DELETE_PIZZA} from '../actions/actionTypes'

function statsReducer (state = {usersCount: 0, productsCount: 0}, action) {
  switch (action.type) {
    case FETCH_STATS_SUCCESS:
      return {
        usersCount: action.data.users,
        productsCount: action.data.products
      }
    case REGISTER_SUCCESS:
      return {
        usersCount: state.usersCount + 1,
        productsCount: state.productsCount
      }
    case CREATE_PIZZA_SUCCESS:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount + 1
      }
    case DELETE_PIZZA:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount - 1
      }
    default:
      return state
  }
}

export default statsReducer
