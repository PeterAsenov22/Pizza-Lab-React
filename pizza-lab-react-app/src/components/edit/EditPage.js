import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import createProductValidator from '../../utils/createProductValidator'
import {createProductValidationFunc} from '../../utils/formValidator'
import {editProductAction, fetchProductsAction} from '../../actions/productsActions'
import {redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class EditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      ingredients: '',
      doughTypes: '',
      description: '',
      weight: '',
      price: '',
      image: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    const productId = this.props.match.params.id
    let product = this.props.products.find(p => p._id === productId)
    if (product) {
      this.setState({
        name: product.name,
        ingredients: product.ingredients.join(','),
        doughTypes: product.doughTypes.join(','),
        description: product.description,
        weight: product.weight,
        price: product.price,
        image: product.image
      })
    } else {
      this.props.fetchProducts()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.editProductError.hasError) {
      toastr.error(nextProps.editProductError.message)
    } else if (nextProps.editProductSuccess) {
      this.props.redirect()
      this.props.history.push('/menu')
    } else {
      const productId = this.props.match.params.id
      let product = this.props.products.find(p => p._id === productId)
      if (product) {
        this.setState({
          name: product.name,
          ingredients: product.ingredients.join(','),
          doughTypes: product.doughTypes.join(','),
          description: product.description,
          weight: product.weight,
          price: product.price,
          image: product.image
        })
      }
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!createProductValidator(this.state.name, this.state.ingredients, this.state.doughTypes,
      this.state.description, this.state.image, this.state.weight, this.state.price)) {
      return
    }
    this.props.editProduct(this.props.match.params.id, this.state.name, this.state.ingredients, this.state.doughTypes,
      this.state.description, this.state.image, this.state.weight, this.state.price)
  }

  render () {
    let productId = this.props.match.params.id
    let product = this.props.products.find(o => o._id === productId)
    if (!product) {
      return (
        <h1>Product not found :(</h1>
      )
    }

    let validObj = createProductValidationFunc(
      this.state.name,
      this.state.ingredients,
      this.state.doughTypes,
      this.state.description,
      this.state.image,
      this.state.weight,
      this.state.price
    )

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Edit Pizza</h1>
          </div>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className='row space-top'>
            <div className='col-md-4'>
              <Input
                type='text'
                name='name'
                label='Name'
                placeholder='Enter pizza name'
                value={this.state.name}
                onChange={this.onChange}
                valid={validObj.validName} />
              <Input
                type='text'
                name='ingredients'
                label='Ingredients'
                placeholder='Enter ingredients for the pizza. Put a comma between them'
                value={this.state.ingredients}
                onChange={this.onChange}
                valid={validObj.validIngredients} />
              <Input
                type='text'
                name='doughTypes'
                label='Dough Types'
                placeholder='Enter dough types for the pizza. Put a comma between them'
                value={this.state.doughTypes}
                onChange={this.onChange}
                valid={validObj.validDoughTypes} />
              <Input
                type='text'
                name='description'
                label='Description'
                placeholder='Enter pizza description'
                value={this.state.description}
                onChange={this.onChange}
                valid={validObj.validDescription} />
            </div>
            <div className='col-md-4'>
              <Input
                type='text'
                name='image'
                label='Image URL'
                placeholder='Enter pizza image URL'
                value={this.state.image}
                onChange={this.onChange}
                valid={validObj.validImage} />
              <Input
                type='number'
                name='weight'
                label='Weight'
                placeholder='Enter pizza weight'
                value={this.state.weight}
                onChange={this.onChange}
                valid={validObj.validWeight} />
              <Input
                type='number'
                name='price'
                label='Price'
                placeholder='Enter pizza price'
                value={this.state.price}
                onChange={this.onChange}
                valid={validObj.validPrice} />
              <input type='submit' className='btn btn-warning' value='Edit' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    editProductSuccess: state.editProduct.success,
    editProductError: state.editProductError,
    products: state.products
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editProduct: (id, name, ingredients, doughTypes, description, image, weight, price) => {
      dispatch(editProductAction(id, {name, ingredients, doughTypes, description, image, weight, price}))
    },
    redirect: () => dispatch(redirectAction()),
    fetchProducts: () => dispatch(fetchProductsAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPage))