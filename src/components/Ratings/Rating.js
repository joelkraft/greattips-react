import React from 'react'
import { PropTypes } from 'prop-types'

const Rating = ({ text, value }) => (
  <li>
    <b>Number of Stars:</b> {value},{' '}
    <b>Comments:</b> {text}
  </li>
)

Rating.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default Rating
