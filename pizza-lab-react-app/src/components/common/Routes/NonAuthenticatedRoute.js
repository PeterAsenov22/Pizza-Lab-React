import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Auth from '../../../utils/auth'

const NonAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    ) : (
      <Component {...props} />
    )
  )
  } />
)

export default NonAuthenticatedRoute
