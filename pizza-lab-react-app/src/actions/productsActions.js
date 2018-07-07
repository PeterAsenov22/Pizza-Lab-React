import {FETCH_DATA_SUCCESS, CREATE_PIZZA_SUCCESS, CREATE_PIZZA_ERROR} from './actionTypes'
import {beginAjax, endAjax} from './ajaxStatusActions'
import {fetchPage, fetchSearchPage, createPizza} from '../api/remote'
import errorHandler from '../utils/errorHandler'

function fetchDataSuccess (data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data
  }
}

function createSuccess (data) {
  return {
    type: CREATE_PIZZA_SUCCESS,
    data
  }
}

function createError (error) {
  return {
    type: CREATE_PIZZA_ERROR,
    error
  }
}

function fetchPageAction (page) {
  return async (dispatch) => {
    dispatch(beginAjax())
    const data = await fetchPage(page)
    dispatch(fetchDataSuccess(data))
    dispatch(endAjax())
  }
}

function fetchSearchPageAction (search, page) {
  return async (dispatch) => {
    dispatch(beginAjax())
    const data = await fetchSearchPage(page, search)
    dispatch(fetchDataSuccess(data))
    dispatch(endAjax())
  }
}

function createProductAction (data) {
  return (dispatch) => {
    dispatch(beginAjax())
    return createPizza(data)
      .then(json => {
        if (json.success) {
          dispatch(createSuccess(json.data))
        } else {
          const error = errorHandler(json)
          dispatch(createError(error))
        }
        dispatch(endAjax())
      })
  }
}

export {
  fetchPageAction,
  fetchSearchPageAction,
  createProductAction
}
