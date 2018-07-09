import React, { Component } from 'react'
import PizzaCardList from '../common/Pizza/PizzaCardList'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class HomePage extends Component {
  render () {
    const startIndex = 0
    const pageSize = 6
    const pizzaCards = this.props.products
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(startIndex, pageSize)

    return (
      <div className='container'>
        <section className='jumbotron text-center'>
          <div className='container'>
            <h1 className='jumbotron-heading'>Welcome to Pizza Lab !</h1>
            <p className='lead text-muted'>Your favourite pizza is now just a few clicks away. Choose from our decent menu or create your own one.</p>
            <p>
              <Link to='/menu' className='btn btn-primary'>Go To Menu</Link>
              <Link to='/create-custom-pizza' className='btn btn-secondary'>Create your pizza</Link>
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
