import React, { Component } from 'react'
import Info from './Info'
import ReviewsContainer from './ReviewsContainer'
import Auth from '../../utils/auth'
import NotFoundPage from '../common/NotFound/NotFoundPage'
import {likeProductAction, unlikeProductAction} from '../../actions/productsActions'
import {addToCartAction} from '../../actions/cartActions'
import {connect} from 'react-redux'

class DetailsPage extends Component {
  render () {
    const productId = this.props.match.params.id
    const product = this.props.products.find(p => p._id === productId)

    if (!product) {
      return (
        <NotFoundPage errMessage='PRODUCT NOT FOUND' />
      )
    }

    const username = Auth.getUsername()

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>{product.name}</h1>
          </div>
        </div>
        <Info
          product={product}
          username={username}
          likeProduct={this.props.likeProduct}
          unlikeProduct={this.props.unlikeProduct}
          addToCart={this.props.addToCart} />
        <ReviewsContainer product={product} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps (dispatch) {
  return {
    likeProduct: (id) => dispatch(likeProductAction(id)),
    unlikeProduct: (id) => dispatch(unlikeProductAction(id)),
    addToCart: (id) => dispatch(addToCartAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)
