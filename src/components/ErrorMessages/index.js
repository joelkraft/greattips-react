import React from 'react'
import { PropTypes } from 'prop-types'

import { connect } from 'react-redux'

import { removeError } from '../../actions/errors'

import ErrorMessage from './ErrorMessage'

import './ErrorMessages.css'

const mapStateToProps = state => ({
  errors: state.errors
})

const mapDispatchToProps = dispatch => ({
  removeError: id => dispatch(removeError(id))
})

const ErrorMessages = ({ removeError, errors }) => {
  return (
    <div className='error-messages'>
      {errors.map(err => (
        <ErrorMessage
          key={err.id}
          message={err.message}
          handleRemove={() => removeError(err.id)}
        />
      ))}
    </div>
  )
}

ErrorMessages.propTypes = {
  errors: PropTypes.array,
  removeError: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessages)
