import React, { Component } from 'react'
import Auth from '../../../utils/auth'
import { addToCartAction } from '../../../actions/cartActions'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class PizzaCard extends Component {
  constructor (props) {
    super(props)

    this.onOrderButtonClick = this.onOrderButtonClick.bind(this)
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
  }

  onOrderButtonClick (e) {
    e.preventDefault()
    if (Auth.isUserAuthenticated()) {
      this.props.addToCart(this.props.id)
      this.props.history.push('/cart')
    } else {
      this.props.history.push('/login')
    }
  }

  onDeleteButtonClick () {
  }

  render () {
    const { id, name, image, description, weight } = this.props
    let footer
    if (Auth.isUserAdmin()) {
      footer = (
        <div className='card-footer'>
          <small className='text-muted'>{weight} gr</small>
          <button className='btn btn-danger float-right btn-sm'><i className='fa fa-trash' /></button>
          <Link to={`/admin/edit/${id}`} className='btn btn-warning float-right btn-sm'><i className='fa fa-edit' /></Link>
        </div>
      )
    } else {
      footer = (
        <div className='card-footer'>
          <small className='text-muted'>{weight} gr</small>
          <Link to={`/details/${id}`} type='button' className='btn btn-primary float-right btn-sm'>Details</Link>
          <button type='button' className='btn btn-warning float-right btn-sm' onClick={this.onOrderButtonClick}>Order</button>
        </div>
      )
    }

    return (
      <div className='card col-4'>
        <img className='card-img-top' src={image} alt={name} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
        </div>
        {footer}
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
