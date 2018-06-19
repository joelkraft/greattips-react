// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Link } from 'react-router-dom'

import './Categories.css'

const mapStateToProps = state => ({
  tips: state.tips.tips
})

const defaultState = {
  tips: []
}

// Should rely on api at some point rather than computing this here
const extractCategories = tips => {
  const categories = tips.reduce(
    (categories, tip) => categories.add(tip.category),
    new Set()
  )
  return Array.from(categories)
}

class Categories extends React.Component {
  state = { ...defaultState }

  render () {
    const { tips } = this.props

    return (
      <div className='Categories'>
        <h2>Categories</h2>
        <ul className="categories-list">
          {extractCategories(tips).map(category => (
            <li className="category">
              <Link to={`/categories/${category}`} key={category}>
                <p>{category}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Categories.propTypes = {
  tips: PropTypes.array
}

export default connect(mapStateToProps)(Categories)
