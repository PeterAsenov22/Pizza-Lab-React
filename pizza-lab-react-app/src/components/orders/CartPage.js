import React, { Component } from 'react'
import CartRow from './CartRow'
import './CartPage.css'
import {Link} from 'react-router-dom'
import {syncCartAction, removeFromCartAction} from '../../actions/cartActions'
import {connect} from 'react-redux'

class CartPage extends Component {
  render () {
    let total = 0
    let cartIds = this.props.cart.map(c => c.id)
    let productsInCart = this.props.products.filter(p => cartIds.includes(p._id))

    for (let product of productsInCart) {
      let quantity = this.props.cart.find(i => i.id === product._id).quantity
      product.quantity = quantity
      total += product.quantity * product.price
    }

    let cartRows = productsInCart.map((p, i) => (<CartRow
      key={i}
      product={p}
      syncCart={this.props.syncCart}
      removeFromCart={this.props.removeFromCart} />))

    return (
      <div className='container'>
        <table id='cart' className='table table-hover table-condensed'>
          <thead>
            <tr>
              <th style={{ 'width': 50 }}>Product</th>
              <th style={{ 'width': 10 }}>Price</th>
              <th style={{ 'width': 8 }}>Quantity</th>
              <th style={{ 'width': 22 }} className='text-center'>Subtotal</th>
              <th style={{ 'width': 10 }} />
            </tr>
          </thead>
          <tbody>
            {cartRows}
          </tbody>
          <tfoot>
            <tr>
              <td><Link to='/menu' className='btn btn-warning'><i className='fa fa-angle-left' /> Continue Shopping</Link></td>
              <td colspan='2' className='hidden-xs' />
              <td className='hidden-xs text-center'><strong>Total ${total.toFixed(2)}</strong></td>
              <td><Link to='/orders/checkout' className='btn btn-success btn-block'>Checkout <i className='fa fa-angle-right' /></Link></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: state.products,
    cart: state.cart
  }
}

function mapDispatchToProps (dispatch) {
  return {
    syncCart: (id, quantity) => dispatch(syncCartAction(id, quantity)),
    removeFromCart: (id) => dispatch(removeFromCartAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
