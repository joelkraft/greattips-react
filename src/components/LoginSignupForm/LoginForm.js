import React from 'react'
import { PropTypes } from 'prop-types'

import Button from '../Button'
import Formsy from 'formsy-react'
import TextInput from '../FormInputs/TextInput'

class LoginForm extends React.Component {
  state = {
    canSubmit: false
  }

  disableButton = () => {
    this.setState({ canSubmit: false })
  }

  enableButton = () => {
    this.setState({ canSubmit: true })
  }

  render () {
    const { toggleLoginSignup, handleSubmit } = this.props
    const { enableButton, disableButton } = this
    return (
      <div>
        <p>Don't have an account yet?</p>
        <Button handler={toggleLoginSignup}>Sign up</Button>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
        >
          <label htmlFor='email'>Email</label>
          <TextInput
            name='email'
            validations='isEmail'
            validationError='Please enter an email address'
            required
          />
          <label htmlFor='password'>Password</label>
          <TextInput
            name='password'
            type='password'
            validations='isExisty'
            validationError='You must enter a password'
            required
          />
          <Button type='submit'>Log in</Button>
        </Formsy>
      </div>
    )
  }
}

LoginForm.propTypes = {
  toggleLoginSignup: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

// handleSubmit, value, handleChange
export default LoginForm
