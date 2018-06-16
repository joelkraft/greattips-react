import React from 'react'
import { PropTypes } from 'prop-types'

class LoginForm extends React.Component {
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
      <p>Don't have an account yet?</p>
      <button onClick={toggleLoginSignup}>Sign up</button>
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
        <button type='submit'>Log in</button>
      </form></div>
    )
  }
}

LoginForm.propTypes = {
  toggleLoginSignup: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

// handleSubmit, value, handleChange
export default LoginForm
