import {FETCH_DATA_SUCCESS, CREATE_PIZZA_SUCCESS, CREATE_PIZZA_ERROR, EDIT_PIZZA_SUCCESS, EDIT_PIZZA_ERROR,
  CREATE_REVIEW_SUCCESS, CREATE_REVIEW_ERROR, LIKE_PRODUCT, UNLIKE_PRODUCT, DELETE_PIZZA} from './actionTypes'
import {beginAjax, endAjax} from './ajaxStatusActions'
import {fetchProducts, createProduct, editProduct, createReview, likeProduct, unlikeProduct, deleteProduct} from '../api/remote'
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

function editSuccess (data) {
  return {
    type: EDIT_PIZZA_SUCCESS,
    data
  }
}

function editError (error) {
  return {
    type: EDIT_PIZZA_ERROR,
    error
  }
}

function deleteSuccess (id) {
  return {
    type: DELETE_PIZZA,
    id
  }
}

function createReviewSuccess (data) {
  return {
    type: CREATE_REVIEW_SUCCESS,
    data
  }
}

function createReviewError (error) {
  return {
    type: CREATE_REVIEW_ERROR,
    error
  }
}

function likeProductSuccess (data) {
  return {
    type: LIKE_PRODUCT,
    data
  }
}

function unlikeProductSuccess (data) {
  return {
    type: UNLIKE_PRODUCT,
    data
  }
}

function fetchProductsAction () {
  return async (dispatch) => {
    dispatch(beginAjax())
    const data = await fetchProducts()
    dispatch(fetchDataSuccess(data))
    dispatch(endAjax())
  }
}

function createProductAction (data) {
  return (dispatch) => {
    dispatch(beginAjax())
    return createProduct(data)
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

function editProductAction (id, data) {
  return (dispatch) => {
    dispatch(beginAjax())
    return editProduct(id, data)
      .then(json => {
        if (json.success) {
          dispatch(editSuccess(json.data))
        } else {
          const error = errorHandler(json)
          dispatch(editError(error))
        }
        dispatch(endAjax())
      })
  }
}

function deleteProductAction (id) {
  return (dispatch) => {
    return deleteProduct(id)
      .then(json => {
        if (json.success) {
          dispatch(deleteSuccess(id))
        }
      })
  }
}

function createProductReviewAction (id, data) {
  return (dispatch) => {
    return createReview(id, data)
      .then(json => {
        if (json.success) {
          dispatch(createReviewSuccess(json.data))
        } else {
          const error = errorHandler(json)
          dispatch(createReviewError(error))
        }
      })
  }
}

function likeProductAction (id) {
  return (dispatch) => {
    return likeProduct(id)
      .then(json => {
        if (json.success) {
          dispatch(likeProductSuccess(json.data))
        }
      })
  }
}

function unlikeProductAction (id) {
  return (dispatch) => {
    return unlikeProduct(id)
      .then(json => {
        if (json.success) {
          dispatch(unlikeProductSuccess(json.data))
        }
      })
  }
}

export {
  fetchProductsAction,
  createProductAction,
  editProductAction,
  createProductReviewAction,
  likeProductAction,
  unlikeProductAction,
  deleteProductAction
}
