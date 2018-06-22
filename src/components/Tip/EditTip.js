// Libs
import React from 'react'
import Formsy from 'formsy-react'
import TextInput from '../FormInputs/TextInput'
import TextArea from '../FormInputs/TextArea'
import { PropTypes } from 'prop-types'
import Button from '../Button'

class EditTip extends React.Component {
  state = { canSubmit: false }

  disableButton = () => {
    this.setState({ canSubmit: false })
  }

  enableButton = () => {
    this.setState({ canSubmit: true })
  }

  render () {
    const { cancel, save, tipData } = this.props
    const { text, category } = tipData
    const { enableButton, disableButton } = this

    return (
      <Formsy
        onValidSubmit={save}
        onValid={enableButton}
        onInvalid={disableButton}
        className='form'
      >
        <label>Tip</label>
        <TextArea
          name='text'
          value={text}
          validations='isExisty'
          validationError='Please enter a tip'
          required
        />
        <label>Category</label>
        <TextInput
          name='category'
          value={category}
          validations='isExisty'
          validationError='Please enter a category for your tip'
          required
        />
        <div className='buttons'>
          <Button type='submit' disabled={!this.state.canSubmit}>Save</Button>
          <Button type='button' handler={cancel}>Cancel</Button>
        </div>
      </Formsy>
    )
  }
}

EditTip.propTypes = {
  tipData: PropTypes.shape({
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}

export default EditTip
