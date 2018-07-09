import React, { Component } from 'react'
import Review from './Review'
import createReviewValidator from '../../utils/createReviewValidator'
import toastr from 'toastr'
import {createProductReviewAction} from '../../actions/productsActions'
import {connect} from 'react-redux'

class ReviewsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      review: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.createReviewError.hasError) {
      toastr.error(nextProps.createProductError.message)
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!createReviewValidator(this.state.review)) {
      this.setState({review: ''})
      return
    }

    const data = {
      review: this.state.review
    }
    this.props.createReview(this.props.product._id, data)
    this.setState({review: ''})
  }

  render () {
    const reviews = this.props.product.reviews.map((r, i) => (<Review key={i} review={r} />))
    return (
      <div className='row space-top'>
        <div className='col-md-8'>
          <form onSubmit={this.onSubmit}>
            <legend>Leave a review</legend>
            <div className='form-group'>
              <textarea
                className='form-control'
                name='review'
                value={this.state.review}
                onChange={this.onChange} />
            </div>
            <div className='form-group'>
              <input type='submit' className='btn btn-secondary' value='Submit review' />
            </div>
          </form>
        </div>
        {reviews}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    createReviewError: state.createReviewError
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createReview: (id, data) => dispatch(createProductReviewAction(id, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer)
