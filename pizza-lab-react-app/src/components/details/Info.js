import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Info extends Component {
  onLikeButtonClick () {
    if (this.props.product.likes.includes(this.props.username)) {
      this.props.unlikeProduct(this.props.product._id)
    } else {
      this.props.likeProduct(this.props.product._id)
    }
  }

  render () {
    const { product, username } = this.props
    let buttonText = 'Like'
    if (product.likes.includes(username)) {
      buttonText = 'Unlike'
    }

    return (
      <div className='row space-top'>
        <div className='col-md-4'>
          <div className='card text-white bg-primary'>
            <div className='card-body bg-light'>
              <blockquote className='card-blockquote'>
                <img src={product.image} alt={product.name} />
              </blockquote>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <p><span className='light-blue-text'>Ingredients</span>: {product.ingredients.join(', ')}</p>
          <p><span className='light-blue-text'>Description</span>: {product.description}</p>
          <p><span className='light-blue-text'>Weight</span>: {product.weight}</p>
          <p><span className='light-blue-text'>Price</span>: {product.price}</p>
          <button className='btn btn-primary btn-sm' onClick={this.onLikeButtonClick.bind(this)}>{buttonText}</button>
          <Link className='btn btn-warning btn-sm' to='/order'>Order</Link>
        </div>
      </div>
    )
  }
}

export default Info
