import React, { Component } from 'react'
import PizzaCard from '../common/Pizza/PizzaCard'
import {fetchPageAction} from '../../actions/productsActions'
import {connect} from 'react-redux'

class HomePage extends Component {
  componentWillMount () {
    const firstPage = 1
    this.props.fetchPage(firstPage)
  }

  render () {
    const startIndex = 0
    const pageSize = 3
    const pizzaCards = this.props.products
      .slice(startIndex, pageSize)
      .map(p => (
        <PizzaCard
          key={p._id}
          name={p.name}
          image={p.image}
          description={p.description}
          weight={p.weight} />
      ))

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Menu</h1>
            <form className='form-inline my-2 my-lg-0'>
              <input className='form-control mr-sm-2' placeholder='Search for your pizza' type='text' />
              <button className='btn btn-outline-warning my-2 my-sm-0' type='submit'>Search</button>
            </form>
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
    fetchPage: (page) => dispatch(fetchPageAction(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
