// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Components
import Button from './Button'
import { Link } from 'react-router-dom'

import './TipPreview.css'

const shortenText = text => {
  const boundary = 35
  return text.length > boundary ? `${text.substr(0, 35)}...` : text
}
const mapStateToProps = state => ({
  tips: state.tips.tips
})

const TipPreview = props => {
  const { tips, match } = props
  const { category } = match.params

  return (
    <div className='Tip-Preview'>
      <Link to='/categories'><Button /></Link>
      <h2>{category}</h2>
      <div className='wrapper'>
        <ul className='list'>
          {tips.filter(tip => tip.category === category).map(({ text, id }) => (
            <li className='preview' key={id}>
              <Link to={`/tips/${id}`}>
                <p>{shortenText(text)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

TipPreview.propTypes = {
  tips: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(TipPreview)
