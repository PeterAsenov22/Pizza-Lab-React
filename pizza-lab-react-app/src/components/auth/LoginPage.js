import React, {Component} from 'react'
import Input from '../common/Input'
import loginValidator from '../../utils/loginValidator'
import toastr from 'toastr'
import Auth from '../../utils/auth'
import {loginValidationFunc} from '../../utils/formValidator'
import {loginAction, redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    if (Auth.isUserAuthenticated()) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loginError.hasError) {
      toastr.error(nextProps.loginError.message)
    } else if (nextProps.loginSuccess) {
      this.props.redirect()
      toastr.success('Login successful')
      this.props.history.push('/')
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!loginValidator(this.state.email, this.state.password)) return
    this.props.login(this.state.email, this.state.password)
  }

  render () {
    let validObj = loginValidationFunc(
      this.state.email,
      this.state.password
    )

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Login</h1>
          </div>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className='row space-top'>
            <div className='col-md-4'>
              <Input
                type='text'
                name='email'
                label='E-mail'
                placeholder='Enter e-mail'
                value={this.state.email}
                onChange={this.onChange}
                valid={validObj.validEmail} />
              <Input
                type='password'
                name='password'
                label='Password'
                placeholder='Enter password'
                value={this.state.password}
                onChange={this.onChange}
                valid={validObj.validPassword} />
              <input type='submit' className='btn btn-primary' value='Login' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loginSuccess: state.login.success,
    loginError: state.loginError
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: (email, password) => dispatch(loginAction(email, password)),
    redirect: () => dispatch(redirectAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
