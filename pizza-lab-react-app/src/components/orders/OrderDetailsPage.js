import React, { Component } from 'react'
import OrderDetailsRow from './OrderDetailsRow'
import { connect } from 'react-redux'

class OrderDetailsPage extends Component {
  render () {
    let orderId = this.props.match.params.id
    let order = this.props.orders.find(o => o._id === orderId)
    let totalPrice = 0
    for (const product of order.products) {
      totalPrice += product.quantity * product.price
    }

    let products = order.products.map((p, i) => (<OrderDetailsRow key={i} product={p} index={i} />))

    return (
      <div className='container mt-4'>
        <h1 className='text-center'>Order #{order._id}</h1>
        <div className='row space-top'>
          <div className='col-md-12 mt-3'>
            <p><span className='font-weight-bold lead'>Products In Order:</span> <span className='ml-2 lead'>{order.products.length}</span></p>
            <p><span className='font-weight-bold lead'>Date:</span> <span className='ml-2 lead'>{new Date(order.date).toLocaleDateString()}</span></p>
            <p><span className='font-weight-bold lead'>Total Price:</span> <span className='ml-2 lead'>${totalPrice.toFixed(2)}</span></p>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-12' id='customer-orders'>
            <div className='box'>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products}
                  </tbody>
                </table>
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
    orders: state.orders
  }
}

export default connect(mapStateToProps)(OrderDetailsPage)
