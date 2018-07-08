import React, {Component} from 'react'
import PizzaCardList from '../common/Pizza/PizzaCardList'
import Paginator from '../common/Paginator'
import {fetchPageAction, fetchSearchPageAction} from '../../actions/productsActions'
import {connect} from 'react-redux'

class MenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  componentWillMount () {
    this.props.fetchPage(Number(this.props.match.params.page) || 1)
  }

  componentWillUpdate (next) {
    console.log(5)
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (this.state.query !== '') {
      this.props.fetchSearch(this.state.query, Number(this.props.match.params.page) || 1)
    }
  }

  render () {
    let {products, stats} = this.props
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
            <h1 className='jumbotron-heading'>Menu</h1>
            <br />
            <p>Search for the pizza you are looking for</p>
            <form className='form-inline my-2 my-lg-0' method='POST' onSubmit={this.onSubmit}>
              <input
                type='text'
                name='query'
                onChange={this.onChange}
                value={this.state.query}
                className='form-control mr-sm-2'
                placeholder='Search for pizza'
              />
              <input className='btn btn-secondary my-2 my-sm-0' type='submit' value='Search' />
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
    fetchPage: (page) => dispatch(fetchPageAction(page)),
    fetchSearch: (query, page) => dispatch(fetchSearchPageAction(query, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage)
