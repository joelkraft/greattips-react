import React from 'react'
import { PropTypes } from 'prop-types'

import Stars from 'react-star-rating-component'
import Button from '../Button'

class NewRatingForm extends React.Component {
  state = {
    value: 0,
    text: ''
  }

  handleChange = label => e => {
    this.setState({
      [label]: e.target.value
    })
  }

  handleStar = newVal => this.setState({ value: newVal })

  render () {
    const { save, cancel } = this.props
    const { value, text } = this.state
    const { handleChange, handleStar } = this
    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          save({ ...this.state })
        }}
      >
        <label>Stars</label>
        <div className='row'>
          <Stars
            name='new-rating'
            starCount={5}
            value={value}
            onStarClick={handleStar}
            emptyStarColor='rgb(230, 230, 230)'
            starColor='rgb(165, 160, 97)'
          />
          <p>{value}</p>
        </div>
        <label>Comments</label>
        <textarea
          value={text}
          onChange={handleChange('text')}
          placeholder='Please leave comments here'
        />
        <div className='row'>
          <Button type='submit'>Submit rating</Button>
          <Button type='button' handler={cancel}>Cancel</Button>
        </div>
      </form>
    )
  }
}

NewRatingForm.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default NewRatingForm
