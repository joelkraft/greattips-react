import React from 'react'
import { PropTypes } from 'prop-types'

import Button from '../Button'

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
      <Button handler={toggleLoginSignup}>Login</Button>
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
        <Button type='submit'>Sign up</Button>
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
