import React, { Component } from 'react'
import PizzaCardList from '../common/Pizza/PizzaCardList'
import Auth from '../../utils/auth'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class HomePage extends Component {
  render () {
    const isAdmin = Auth.isUserAdmin()
    const isAuthenticated = Auth.isUserAuthenticated()

    let headingText, secondLinkName, secondLinkPath
    if (isAdmin) {
      headingText = ', ' + Auth.getUsername()
      secondLinkName = 'View pending orders'
      secondLinkPath = '/admin/orders'
    } else if (isAuthenticated) {
      headingText = ', ' + Auth.getUsername()
      secondLinkName = 'View your orders'
      secondLinkPath = '/orders'
    } else {
      headingText = ''
      secondLinkName = 'Register'
      secondLinkPath = '/register'
    }

    const startIndex = 0
    const pageSize = 6
    const pizzaCards = this.props.products
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(startIndex, pageSize)

    return (
      <div className='container'>
        <section className='jumbotron text-center'>
          <div className='container'>
            <h1 className='jumbotron-heading'>Welcome to Pizza Lab{headingText} !</h1>
            {!isAuthenticated && <p className='lead text-muted'>Your favourite pizza is now just a few clicks away. Register now and choose from our decent menu.</p>}
            <p>
              <Link to='/menu' className='btn btn-primary'>Go To Menu</Link>
              <Link to={secondLinkPath} className='btn btn-secondary'>{secondLinkName}</Link>
            </p>
          </div>
        </section>
        <h2 className='font-italic text-muted text-center'>Top Rated</h2>
        <PizzaCardList products={pizzaCards} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(HomePage)
