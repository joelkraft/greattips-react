import React from 'react'
import Formsy from 'formsy-react'
import TextInput from '../FormInputs/TextInput'
import Button from '../Button'

export default class EditProfileForm extends React.Component {
  state = { canSubmit: false }

  disableButton = () => {
    this.setState({ canSubmit: false })
  }

  enableButton = () => {
    this.setState({ canSubmit: true })
  }

  render () {
    const { cancel, save, userData } = this.props
    const { name, email } = userData
    const { enableButton, disableButton } = this
    
    return (
      <div className="edit-profile">
      <Formsy
        onValidSubmit={save}
        onValid={enableButton}
        onInvalid={disableButton}
      >
        <label>Name</label>
        <TextInput
          name='name'
          value={name}
          validations='isExisty'
          validationError='Please enter a name'
          required
        />
        <label>Email</label>
        <TextInput
          name='email'
          value={email}
          validations='isEmail'
          validationError='This is not a valid email'
          required
        />
        <Button type='submit' disabled={!this.state.canSubmit}>Save</Button>
        <Button type='button' handler={cancel}>Cancel</Button>
      </Formsy></div>
    )
  }
}
