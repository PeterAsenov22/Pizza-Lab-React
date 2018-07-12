import React, { Component } from 'react'
import OrdersRow from './OrdersRow'
import {fetchUserOrdersAction} from '../../actions/ordersActions'
import {connect} from 'react-redux'

class OrdersPage extends Component {
  componentWillMount () {
    this.props.fetchUserOrders()
  }

  render () {
    let orders = this.props.orders.map((o, i) => (<OrdersRow key={o._id} order={o} index={i} />))
    return (
      <div className='container' style={{'paddingTop': 25}}>
        <h1 className='text-center'>My Orders</h1>
        <div className='row' style={{'paddingTop': 25}}>
          <div className='col-md-12' id='customer-orders'>
            <div className='box'>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders}
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

function mapDispatchToProps (dispatch) {
  return {
    fetchUserOrders: () => dispatch(fetchUserOrdersAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
