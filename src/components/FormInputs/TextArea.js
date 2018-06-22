import { withFormsy } from 'formsy-react'
import React, { Component } from 'react'

class TextArea extends Component {
  render () {
    const errorMessage = this.props.getErrorMessage()
    const { setValue, getValue } = this.props

    return (
      <div>
        <textarea
          onChange={e => setValue(e.currentTarget.value)}
          value={getValue() || ''}
        />
        <span>{errorMessage}</span>
      </div>
    )
  }
}

export default withFormsy(TextArea)
