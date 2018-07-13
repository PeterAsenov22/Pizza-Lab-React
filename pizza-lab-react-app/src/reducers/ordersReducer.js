import {SUBMIT_ORDER, FETCH_USER_ORDERS, FETCH_PENDING_ORDERS, APPROVED_ORDER, LOGOUT_SUCCESS} from '../actions/actionTypes'

function userOrdersReducer (state = [], action) {
  switch (action.type) {
    case FETCH_USER_ORDERS:
      return reconcile(state, action.orders)
    case SUBMIT_ORDER:
      return reconcile(state, [action.order])
    case LOGOUT_SUCCESS:
      return []
    default:
      return state
  }
}

function pendingOrdersReducer (state = [], action) {
  switch (action.type) {
    case FETCH_PENDING_ORDERS:
      return reconcile(state, action.orders)
    case APPROVED_ORDER:
      return state.filter(o => o._id !== action.id)
    case LOGOUT_SUCCESS:
      return []
    default:
      return state
  }
}

function reconcile (oldData, newData) {
  const newDataById = {}
  for (const entry of newData) {
    newDataById[entry._id] = entry
  }

  const result = []
  for (const entry of oldData) {
    if (newDataById[entry._id]) {
      result.push(newDataById[entry._id])
      delete newDataById[entry._id]
    } else {
      result.push(entry)
    }
  }

  for (const entryId in newDataById) {
    result.push(newDataById[entryId])
  }

  return result
}

export {
  userOrdersReducer,
  pendingOrdersReducer
}
