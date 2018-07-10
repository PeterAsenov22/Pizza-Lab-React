import React, { Component } from 'react'
import Info from './Info'
import ReviewsContainer from './ReviewsContainer'
import Auth from '../../utils/auth'
import {likeProductAction, unlikeProductAction} from '../../actions/productsActions'
import {connect} from 'react-redux'

class DetailsPage extends Component {
  render () {
    const productId = this.props.match.params.id
    const product = this.props.products.find(p => p._id === productId)

    if (!product) {
      return (
        <h1>Product not found :(</h1>
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
          unlikeProduct={this.props.unlikeProduct} />
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
    unlikeProduct: (id) => dispatch(unlikeProductAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)