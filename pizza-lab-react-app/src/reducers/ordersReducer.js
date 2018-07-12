import {SUBMIT_ORDER, FETCH_USER_ORDERS} from '../actions/actionTypes'

function ordersReducer (state = [], action) {
  switch (action.type) {
    case FETCH_USER_ORDERS:
      return reconcile(state, action.orders)
    case SUBMIT_ORDER:
      return reconcile(state, [action.order])
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

export default ordersReducer
