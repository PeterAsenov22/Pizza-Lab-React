import React, { Component } from 'react'
import PizzaCardList from '../common/Pizza/PizzaCardList'
import Paginator from '../common/Paginator'
import { fetchProductsAction } from '../../actions/productsActions'
import { connect } from 'react-redux'

class MenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    this.props.fetchProducts()
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    let { products, stats } = this.props
    let productsCount = stats.productsCount
    const page = Number(this.props.match.params.page) || 1
    let query = this.state.query
    if (query !== '') {
      products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      productsCount = products.length
    }

    const pageSize = 9
    products = products.slice((page - 1) * pageSize, page * pageSize)

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1 className='jumbotron-heading text-center'>Menu</h1>
            <form class='form-inline md-form form-sm active-cyan active-cyan-2'>
              <i class='fa fa-search' aria-hidden='true' />
              <input
                class='form-control form-control-sm ml-3 w-75'
                type='text'
                placeholder='Search for the pizza you are looking for...'
                aria-label='Search'
                name='query'
                onChange={this.onChange}
                value={this.state.query} />
            </form>
          </div>
        </div>
        <PizzaCardList products={products} />
        <Paginator
          productsCount={productsCount}
          pageSize={pageSize}
          current={page} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: state.products,
    stats: state.stats
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProductsAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage)
