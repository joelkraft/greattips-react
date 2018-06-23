import { withFormsy } from 'formsy-react'
import React, { Component } from 'react'

class TextField extends Component {
  render () {
    const errorMessage = this.props.getErrorMessage()
    const { setValue, getValue, type } = this.props

    return (
      <div>
        <input
          onChange={e => setValue(e.currentTarget.value)}
          type={ type || 'text'}
          value={getValue() || ''}
        />
        <span>{errorMessage}</span>
      </div>
    )
  }
}

export default withFormsy(TextField)
