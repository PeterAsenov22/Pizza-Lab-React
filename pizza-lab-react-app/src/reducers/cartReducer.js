import {ADD_TO_CART, SYNC_CART, REMOVE_FROM_CART, SUBMIT_ORDER} from '../actions/actionTypes'

function cartReducer (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      let product = state.find(p => p.id === action.id)
      if (product) {
        return state
      }
      let newState = state.slice()
      newState.push({id: action.id, quantity: 1})
      return newState
    case SYNC_CART:
      product = state.find(p => p.id === action.id)
      if (product.quantity === action.quantity) {
        return state
      }
      newState = state.slice()
      newState.find(p => p.id === action.id).quantity = action.quantity
      return newState
    case REMOVE_FROM_CART:
      newState = []
      for (const product of state) {
        if (product.id !== action.id) {
          newState.push(product)
        }
      }
      return newState
    case SUBMIT_ORDER:
      return []
    default:
      return state
  }
}

export default cartReducer
