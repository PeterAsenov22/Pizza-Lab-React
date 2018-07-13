import React from 'react'
import Auth from '../../utils/auth'
import {Link} from 'react-router-dom'

const OrdersRow = (props) => {
  const isAdmin = Auth.isUserAdmin()
  const {date, products, status} = props.order
  let totalPrice = 0
  for (const product of products) {
    totalPrice += product.quantity * product.price
  }

  return (
    <tr>
      <th>#{props.index + 1}</th>
      <td>{new Date(date).toLocaleString()}</td>
      <td>$ {totalPrice.toFixed(2)}</td>
      <td><span className='label label-info'>{status}</span>
      </td>
      <td>
        <Link to={`/orders/details/${props.order._id}`} className='btn btn-outline-warning btn-sm'>View</Link>
      </td>
      {isAdmin && <td><button className='btn btn-outline-success btn-sm' onClick={() => props.onApprove(props.order._id)}>Approve</button></td>}
    </tr>
  )
}

export default OrdersRow
