import React from 'react'
import { PropTypes } from 'prop-types'

class NewRatingForm extends React.Component {
  state = {
    value: 0,
    text: ''
  }

  handleChange = label => e => {
    this.setState({
      [label]: e.target.value
    })
  }

  render () {
    const { save, cancel } = this.props
    const { value, text } = this.state
    const { handleChange } = this
    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          save({ ...this.state })
        }}
      >
        <label>Stars</label>
        <p>{value}</p>
        <input
          type='range'
          min='0.5'
          max='5'
          step='0.5'
          value={value}
          onChange={handleChange('value')}
        />
        <label>Comments</label>
        <textarea
          value={text}
          onChange={handleChange('text')}
          placeholder='Please leave comments here'
        />
        <button type='submit'>Submit rating</button>
        <button type='button' onClick={cancel}>Cancel</button>
      </form>
    )
  }
}

NewRatingForm.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default NewRatingForm
