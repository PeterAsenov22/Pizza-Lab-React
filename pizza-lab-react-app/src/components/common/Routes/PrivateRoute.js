import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Auth from '../../../utils/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )
  } />
)

export default PrivateRoute
