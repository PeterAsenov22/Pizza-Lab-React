import React, { Component } from 'react'
import PizzaCard from '../common/Pizza/PizzaCard'
import {Link} from 'react-router-dom'
// import { fetchPageAction } from '../../actions/productsActions'
import { connect } from 'react-redux'

class HomePage extends Component {
  componentWillMount () {
    // this.props.fetchTopRated()
  }

  render () {
    const startIndex = 0
    const pageSize = 3
    const pizzaCards = this.props.products
      .slice(startIndex, pageSize)
      .map(p => (
        <PizzaCard
          key={p._id}
          id={p._id}
          name={p.name}
          image={p.image}
          description={p.description}
          weight={p.weight} />
      ))

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
        <div className='row space-top'>
          <div className='card-deck'>
            {pizzaCards}
          </div>
        </div>
        <div className='row space-top'>
          <div className='card-deck'>
            {pizzaCards}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // fetchTopRated: () => dispatch(fetchTopRatedAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
