import React, { Component } from 'react'
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

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>{product.name}</h1>
          </div>
        </div>
        <div className='row space-top'>
          <div className='col-md-4'>
            <div className='card text-white bg-primary'>
              <div className='card-body bg-light'>
                <blockquote className='card-blockquote'>
                  <img src={product.image} />
                </blockquote>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <p>Ingredients: {product.ingredients.join(', ')}</p>
            <p>Description: {product.description}</p>
            <p>Weight: {product.weight}</p>
            <p>Price: {product.price}</p>
            <a href='#' className='btn btn-primary'>Like</a>
          </div>
        </div>
        <div className='row space-top'>
          <div className='col-md-8'>
            <form>
              <legend>Leave a review</legend>
              <div className='form-group'>
                <textarea className='form-control' />
              </div>
              <div className='form-group'>
                <label>Rating</label>
                <div className='btn-group mr-2' role='group' aria-label='First group'>
                  <button type='button' className='btn btn-secondary'>1</button>
                  <button type='button' className='btn btn-secondary'>2</button>
                  <button type='button' className='btn btn-primary'>3</button>
                  <button type='button' className='btn btn-secondary'>4</button>
                  <button type='button' className='btn btn-secondary'>5</button>
                </div>
                <input type='submit' className='btn btn-primary' value='Submit review' />
              </div>
            </form>
          </div>
          <div className='col-md-8'>
            <div className='card text-black bg-light'>
              <div className='card-body'>
                <blockquote className='card-blockquote'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in
                  <cite title='Source Title'>Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='card text-black bg-light'>
              <div className='card-body'>
                <blockquote className='card-blockquote'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in
                  <cite title='Source Title'>Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='card text-black bg-light'>
              <div className='card-body'>
                <blockquote className='card-blockquote'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in
                  <cite title='Source Title'>Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(DetailsPage)
