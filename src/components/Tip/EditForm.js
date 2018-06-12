// Libs
import React from 'react'
import { PropTypes } from 'prop-types'

class EditForm extends React.Component {
  state = { ...this.props.initialState }

  setVal = key => e => this.setState({ ...this.state, [key]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    this.props.submit(this.state)
  }

  render () {
    const { category, text } = this.state
    const { cancel } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Tip</label>
        <input type='text' value={text} onChange={this.setVal('text')} />
        <label>Category</label>
        <input
          type='text'
          value={category}
          onChange={this.setVal('category')}
        />
        <button type='submit'>Save</button>
        <button type='button' onClick={cancel}>
          Cancel
        </button>
      </form>
    )
  }
}

EditForm.propTypes = {
  initialState: PropTypes.shape({
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  cancel: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

export default EditForm
