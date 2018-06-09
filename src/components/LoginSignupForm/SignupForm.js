import React from 'react'
import { PropTypes } from 'prop-types'

class SignupForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  setVal = (label, value) => {
    this.setState({ [label]: value })
  }

  render () {
    const { toggleLoginSignup, handleSubmit } = this.props
    return (<div>
      <p>Already have an account?</p>
      <a href='#' onClick={toggleLoginSignup}>Login</a>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(this.state)
        }}
      >
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          id='email'
          value={this.state.email}
          onChange={e => this.setVal('email', e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={this.state.password}
          onChange={e => this.setVal('password', e.target.value)}
        />
        <button type='submit'>Sign up</button>
      </form></div>
    )
  }
}

SignupForm.propTypes = {
  toggleLoginSignup: PropTypes.func.isRequired
}
// Proptypes
// handleSubmit, value, handleChange
export default SignupForm
