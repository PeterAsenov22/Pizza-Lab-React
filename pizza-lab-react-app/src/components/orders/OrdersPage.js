import React, { Component } from 'react'
import OrdersRow from './OrdersRow'
import Auth from '../../utils/auth'
import {fetchUserOrdersAction, fetchPendingOrdersAction, approveOrderAction} from '../../actions/ordersActions'
import {connect} from 'react-redux'

class OrdersPage extends Component {
  constructor (props) {
    super(props)

    this.onApproveButtonClick = this.onApproveButtonClick.bind(this)
  }

  componentWillMount () {
    if (Auth.isUserAdmin()) {
      this.props.fetchPendingOrders()
    } else {
      this.props.fetchUserOrders()
    }
  }

  onApproveButtonClick (id) {
    this.props.approveOrder(id)
  }

  render () {
    let heading
    let noOrdersMessage
    let orders
    const isAdmin = Auth.isUserAdmin()
    if (isAdmin) {
      orders = this.props.pendingOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((o, i) => (<OrdersRow key={o._id} order={o} index={i} onApprove={this.onApproveButtonClick} />))
      heading = 'Pending Orders'
      noOrdersMessage = 'There are currently no pending orders!'
    } else {
      orders = this.props.userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((o, i) => (<OrdersRow key={o._id} order={o} index={i} />))
      heading = 'My Orders'
      noOrdersMessage = 'You have not made any orders!'
    }

    return (
      <div className='container' style={{'paddingTop': 25}}>
        <h1 className='text-center'>{heading}</h1>
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
                      <th>View</th>
                      {isAdmin && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {orders}
                  </tbody>
                </table>
                {orders.length === 0 && <h3 className='text-warning'>{noOrdersMessage}</h3>}
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
    userOrders: state.userOrders,
    pendingOrders: state.pendingOrders
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserOrders: () => dispatch(fetchUserOrdersAction()),
    fetchPendingOrders: () => dispatch(fetchPendingOrdersAction()),
    approveOrder: (id) => dispatch(approveOrderAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
