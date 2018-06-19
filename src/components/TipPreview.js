// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Components
import BackButton from './BackButton'
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
  tips: state.tips.tips
})

const TipPreview = props => {
  const { tips, match } = props
  const { category } = match.params
  
  return (
    <div>
      <p>
        <Link to='/categories'><BackButton /></Link>
      </p>
      <h1>Tip Preview</h1>
      <p>{category}</p>
      <ul>
        {tips
          .filter(tip => tip.category === category)
          .map(({ text, id }) => (
            <Link to={`/tips/${id}`} key={id}>
              <li>{text}</li>
            </Link>
          ))}
      </ul>
    </div>
  )
}

TipPreview.propTypes = {
  tips: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(TipPreview)
