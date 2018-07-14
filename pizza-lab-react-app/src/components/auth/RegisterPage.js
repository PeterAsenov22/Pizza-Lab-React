import React from 'react'
import Input from '../common/Input'
import registerValidator from '../../utils/registerValidator'
import toastr from 'toastr'
import Auth from '../../utils/auth'
import {registerValidationFunc} from '../../utils/formValidator'
import {registerAction, loginAction, redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    if (nextProps.registerError.hasError) {
      toastr.error(nextProps.registerError.message)
    } else if (nextProps.registerSuccess) {
      this.props.login(this.state.email, this.state.password)
    } else if (nextProps.loginSuccess) {
      this.props.redirect()
      toastr.success('Registration successful')
      this.props.history.push('/')
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!registerValidator(this.state.username, this.state.email, this.state.password, this.state.confirmPassword)) return
    this.props.register(this.state.username, this.state.email, this.state.password)
  }

  render () {
    let validObj = registerValidationFunc(
      this.state.email,
      this.state.username,
      this.state.password,
      this.state.confirmPassword
    )

    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Register</h1>
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
                type='text'
                name='username'
                label='Username'
                placeholder='Enter username'
                value={this.state.username}
                onChange={this.onChange}
                valid={validObj.validUsername} />
              <Input
                type='password'
                name='password'
                label='Password'
                placeholder='Enter password'
                value={this.state.password}
                onChange={this.onChange}
                valid={validObj.validPassword} />
              <Input
                type='password'
                name='confirmPassword'
                label='Confirm Password'
                placeholder='Enter your password again'
                value={this.state.confirmPassword}
                onChange={this.onChange}
                valid={validObj.validConfirmPassword} />
              <input type='submit' className='btn btn-primary' value='Register' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    registerSuccess: state.register.success,
    loginSuccess: state.login.success,
    registerError: state.registerError
  }
}

function mapDispatchToProps (dispatch) {
  return {
    register: (username, email, password) => dispatch(registerAction(username, email, password)),
    login: (email, password) => dispatch(loginAction(email, password)),
    redirect: () => dispatch(redirectAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage))
