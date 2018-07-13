import React, { Component } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Preloader from './components/common/Preloader/Preloader'
import HomePage from './components/home/HomePage'
import RegisterPage from './components/auth/RegisterPage'
import LoginPage from './components/auth/LoginPage'
import CreatePage from './components/create/CreatePage'
import EditPage from './components/edit/EditPage'
import MenuPage from './components/menu/MenuPage'
import DetailsPage from './components/details/DetailsPage'
import CartPage from './components/cart/CartPage'
import OrdersPage from './components/orders/OrdersPage'
import OrderDetailsPage from './components/orders/OrderDetailsPage'
import NotFoundPage from './components/common/NotFound/NotFoundPage'
import Auth from './utils/auth'
import PrivateRoute from './components/common/Routes/PrivateRoute'
import AdminRoute from './components/common/Routes/AdminRoute'
import fetchStatsAction from './actions/statsActions'
import toastr from 'toastr'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from './actions/authActions'
import { fetchProductsAction } from './actions/productsActions'

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
    this.props.fetchStats()
    this.props.fetchProducts()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loginSuccess) {
      this.setState({ loggedIn: true })
    }
  }

  logout () {
    this.setState({ loggedIn: false })
    this.props.logout()
    toastr.success('Logout successful')
    this.props.history.push('/login')
  }

  render () {
    const isAdmin = Auth.isUserAdmin()
    const {productsCount, usersCount} = this.props.stats

    return (
      <div className='App'>
        <Navbar
          products={productsCount}
          users={usersCount}
          loggedIn={this.state.loggedIn}
          isAdmin={isAdmin}
          logout={this.logout} />
        <Preloader />
        <main>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/menu' component={MenuPage} />
            <Route exact path='/menu/:page' component={MenuPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
            <AdminRoute path='/admin/create' component={CreatePage} />
            <AdminRoute path='/admin/edit/:id' component={EditPage} />
            <AdminRoute path='/admin/orders' component={OrdersPage} />
            <PrivateRoute path='/details/:id' component={DetailsPage} />
            <PrivateRoute path='/cart' component={CartPage} />
            <PrivateRoute path='/orders/details/:id' component={OrderDetailsPage} />
            <PrivateRoute exact path='/orders' component={OrdersPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loginSuccess: state.login.success,
    stats: state.stats
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
    fetchStats: () => dispatch(fetchStatsAction()),
    fetchProducts: () => dispatch(fetchProductsAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
