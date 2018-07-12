import {SUBMIT_ORDER, FETCH_USER_ORDERS} from './actionTypes'
import {beginAjax, endAjax} from './ajaxStatusActions'
import {submitOrder, fetchUserOrders} from '../api/remote'

function submitOrderSuccess (order) {
  return {
    type: SUBMIT_ORDER,
    order
  }
}

function fetchOrdersSuccess (orders) {
  return {
    type: FETCH_USER_ORDERS,
    orders
  }
}

function submitOrderAction (data) {
  return (dispatch) => {
    return submitOrder(data)
      .then(json => {
        if (json.success) {
          dispatch(submitOrderSuccess(json.data))
        }
      })
  }
}

function fetchUserOrdersAction () {
  return async (dispatch) => {
    dispatch(beginAjax())
    const data = await fetchUserOrders()
    dispatch(fetchOrdersSuccess(data))
    dispatch(endAjax())
  }
}

export {
  submitOrderAction,
  fetchUserOrdersAction
}
