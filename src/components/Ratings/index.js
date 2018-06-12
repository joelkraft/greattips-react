// Libs
import React from 'react'
// import { PropTypes } from "prop-types";
import { connect } from 'react-redux'

// Components
import NewRatingForm from './NewRatingForm'
import Rating from './Rating'

//Actions
import { saveNewRating } from '../../actions/ratings'

import './Ratings.css'

const mapStateToProps = state => ({
  allRatings: state.ratings.data
})

const mapDispatchToProps = dispatch => ({
  handleSaveNewRating: data => dispatch(saveNewRating(data))
})

// Should be done in the api call
const filterNonRelaventRatings = tipId => rating => {
  return rating.tipId.toString() === tipId.toString()
}

// Should be done in the api call
const getRatingsForState = ({ allRatings, tipId }) =>
  allRatings.filter(filterNonRelaventRatings(tipId))

class Ratings extends React.Component {
  state = {
    showRatingForm: false,
    nextId: 0,
    ratings: getRatingsForState(this.props)
  }

  toggleNewRatingForm = () => {
    this.setState({ showRatingForm: !this.state.showRatingForm })
  }

  buildRatingAndSave = data =>
    this.props
      .handleSaveNewRating({
        ...data,
        tipId: this.props.tipId,
        id: this.state.nextId++ // Todo Replace with real ID
      })
      .then(data => this.setState({ ratings: [...this.state.ratings, data] }))
      .then(this.toggleNewRatingForm)

  render () {
    const { showRatingForm, ratings } = this.state
    const { toggleNewRatingForm, buildRatingAndSave } = this

    return (
      <div id='ratings'>
        <h2>Ratings</h2>
        {showRatingForm
          ? <NewRatingForm
            save={buildRatingAndSave}
            cancel={() => this.setState({ showRatingForm: false })}
            />
          : <button onClick={toggleNewRatingForm}>
              Rate this tip
            </button>}
        {ratings.length
          ? <ul>
            {ratings.map((rating, index) => (
              <Rating text={rating.text} value={rating.value} key={index} />
              ))}
          </ul>
          : <p>There are no ratings yet.</p>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ratings)
