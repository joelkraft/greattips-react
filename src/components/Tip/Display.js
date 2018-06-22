// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import Button from '../Button'

const Display = ({ text, category, authorName, authorEmail, handleClick }) => (
  <div className="display">
    <p className='tip-text'>{text}</p>
    <p>Category: <span className='category-name'>{category}</span></p>
    {authorName && <p>Author: {authorName}</p>}
    {authorEmail &&
      <Button handler={handleClick}>
        Edit tip
      </Button>}
  </div>
)

Display.propTypes = {
  text: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  authorName: PropTypes.string,
  handleClick: PropTypes.func.isRequired
}

export default Display
