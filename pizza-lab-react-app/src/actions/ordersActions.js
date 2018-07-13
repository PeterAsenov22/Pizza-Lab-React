import {SUBMIT_ORDER, FETCH_USER_ORDERS, FETCH_PENDING_ORDERS, APPROVED_ORDER} from './actionTypes'
import {beginAjax, endAjax} from './ajaxStatusActions'
import {submitOrder, fetchUserOrders, fetchPendingOrders, approveOrder} from '../api/remote'

function submitOrderSuccess (order) {
  return {
    type: SUBMIT_ORDER,
    order
  }
}

function fetchUserOrdersSuccess (orders) {
  return {
    type: FETCH_USER_ORDERS,
    orders
  }
}

function fetchPendingOrdersSuccess (orders) {
  return {
    type: FETCH_PENDING_ORDERS,
    orders
  }
}

function approveOrderSuccess (id) {
  return {
    type: APPROVED_ORDER,
    id
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

function approveOrderAction (id) {
  return (dispatch) => {
    return approveOrder(id)
      .then(json => {
        if (json.success) {
          dispatch(approveOrderSuccess(id))
        }
      })
  }
}

function fetchUserOrdersAction () {
  return async (dispatch) => {
    dispatch(beginAjax())
    const data = await fetchUserOrders()
    dispatch(fetchUserOrdersSuccess(data))
    dispatch(endAjax())
  }
}

function fetchPendingOrdersAction () {
  return async (dispatch) => {
    dispatch(beginAjax())
    const data = await fetchPendingOrders()
    dispatch(fetchPendingOrdersSuccess(data))
    dispatch(endAjax())
  }
}

export {
  submitOrderAction,
  fetchUserOrdersAction,
  fetchPendingOrdersAction,
  approveOrderAction
}
