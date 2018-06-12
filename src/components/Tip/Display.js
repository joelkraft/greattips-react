// Libs
import React from 'react'
import { PropTypes } from 'prop-types'

const Display = ({
  text,
  category,
  authorName,
  authorEmail,
  handleClick
}) => (
  <div>
    <div>
      <h1>Tip</h1>
      <p>{text}</p>
      <h2>Category</h2>
      <p>{category}</p>
    </div>
    {authorName && <p><b>Author:</b> {authorName}</p>}
    {authorEmail &&
      <button
        onClick={handleClick}
      >
        Edit tip
      </button>}
  </div>
)

Display.propTypes = {
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    authorName: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
}

export default Display
