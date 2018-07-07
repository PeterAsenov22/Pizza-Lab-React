import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Auth from '../../../utils/auth'

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAdmin() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )
  )
  } />
)

export default AdminRoute
