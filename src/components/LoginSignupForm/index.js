import React from 'react'
import { PropTypes } from 'prop-types'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

class LoginSignupForm extends React.Component {
  state = {
    signupVisible: false
  }

  toggleLoginSignup = e => {
    e.preventDefault()
    this.setState({
      signupVisible: !this.state.signupVisible
    })
  }

  render () {
    const { handleLogin, handleSignup } = this.props
    if (this.state.signupVisible) {
      return (
        <SignupForm
          handleSubmit={handleSignup}
          toggleLoginSignup={this.toggleLoginSignup}
        />
      )
    } else {
      return (
        <LoginForm
          handleSubmit={handleLogin}
          toggleLoginSignup={this.toggleLoginSignup}
        />
      )
    }
  }
}

LoginSignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginSignupForm
