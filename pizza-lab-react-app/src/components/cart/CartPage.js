import React, { Component } from 'react'
import CartRow from './CartRow'
import './CartPage.css'
import {Link, withRouter} from 'react-router-dom'
import {syncCartAction, removeFromCartAction} from '../../actions/cartActions'
import {submitOrderAction} from '../../actions/ordersActions'
import {connect} from 'react-redux'

class CartPage extends Component {
  onCheckoutButtonClick () {
    let products = []
    for (let element of this.props.cart) {
      let product = this.props.products.find(p => p._id === element.id)
      products.push({
        id: element.id,
        name: product.name,
        quantity: element.quantity,
        price: product.price
      })
    }
    this.props.submitOrder(products)
    this.props.history.push('/orders')
  }

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
              <td colSpan='2' className='hidden-xs' />
              <td className='hidden-xs text-center'><strong>Total ${total.toFixed(2)}</strong></td>
              {productsInCart.length > 0 && <td><button onClick={this.onCheckoutButtonClick.bind(this)} className='btn btn-success btn-block'>Checkout <i className='fa fa-angle-right' /></button></td>}
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
    removeFromCart: (id) => dispatch(removeFromCartAction(id)),
    submitOrder: (data) => dispatch(submitOrderAction(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage))
