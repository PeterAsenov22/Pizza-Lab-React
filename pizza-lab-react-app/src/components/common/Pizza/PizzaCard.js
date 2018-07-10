import React, { Component } from 'react'
import {addToCartAction} from '../../../actions/cartActions'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'

class PizzaCard extends Component {
  onOrderButtonClick (e) {
    e.preventDefault()
    this.props.addToCart(this.props.id)
    this.props.history.push('/cart')
  }

  render () {
    const { id, name, image, description, weight } = this.props
    return (
      <div className='card col-4'>
        <img className='card-img-top' src={image} alt={name} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
        </div>
        <div className='card-footer'>
          <small className='text-muted'>{weight} gr</small>
          <Link to={`/details/${id}`} type='button' className='btn btn-primary float-right btn-sm'>Details</Link>
          <button type='button' className='btn btn-warning float-right btn-sm' onClick={this.onOrderButtonClick.bind(this)}>Order</button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addToCart: (id) => dispatch(addToCartAction(id))
  }
}

export default withRouter(connect(() => { return {} }, mapDispatchToProps)(PizzaCard))
