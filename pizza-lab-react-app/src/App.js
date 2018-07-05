import React, { Component } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import HomePage from './components/home/HomePage'
import RegisterPage from './components/auth/RegisterPage'
import LoginPage from './components/auth/LoginPage'
import Auth from './utils/auth'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from './actions/authActions'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false
    }

    this.logout = this.logout.bind(this)
  }

  componentWillMount () {
    if (Auth.isUserAuthenticated()) {
      this.setState({ loggedIn: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loginSuccess) {
      this.setState({ loggedIn: true })
    }
  }

  logout () {
    this.setState({ loggedIn: false })
    this.props.logout()
    this.props.history.push('/login')
  }

  render () {
    const isAdmin = Auth.isUserAdmin()

    return (
      <div className='App'>
        <Navbar
          loggedIn={this.state.loggedIn}
          isAdmin={isAdmin}
          logout={this.logout} />
        <main>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loginSuccess: state.login.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logoutAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
