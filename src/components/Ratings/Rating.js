import React from 'react'
import { PropTypes } from 'prop-types'
import Stars from 'react-star-rating-component'

const Rating = ({ text, value }) => (
  <li className="rating">
    <Stars
      name="rating"
      value={value}
      starCount={5}
      editing={false}
      emptyStarColor='rgb(230, 230, 230)'
      starColor='rgb(165, 160, 97)'
    />
    {' '}
    <p>{text}</p>
  </li>
)

Rating.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default Rating
