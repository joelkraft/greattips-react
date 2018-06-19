// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { saveNewTip } from '../actions/tips'

import './NewTip.css'

const mapStateToProps = state => ({
  userData: state.profile.userData,
  tips: state.tips.tips
})

const mapDispatchToProps = dispatch => ({
  handleSaveNewTip: data => dispatch(saveNewTip(data))
})

const defaultState = {
  tipData: {
    text: '',
    category: ''
  }
}

class NewTip extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ...defaultState }
  }

  updateLocalTipData = label => e => {
    const { value } = e.target
    this.setState({
      tipData: {
        ...this.state.tipData,
        [label]: value
      }
    })
  }

  saveNewTip = e => {
    e.preventDefault()
    const newTip = {
      ...this.state.tipData,
      id: this.props.tips.length,
      authorEmail: this.props.userData.email,
      authorName: this.props.userData.name
    }
    this.props
      .handleSaveNewTip(newTip)
      .then(result => this.setState(defaultState))
  }

  render () {
    const { text, category } = this.state.tipData

    return (
      <div className="new-tip">
        <h2>New Tip</h2>
        <form onSubmit={this.saveNewTip}>
          <label htmlFor='tipText'>Tip Text</label>
          <textarea
            name='tipText'
            id='tipText'
            cols='30'
            rows='5'
            onChange={this.updateLocalTipData('text')}
            value={text}
          />
          <label htmlFor='tipCategory'>Category</label>
          <input
            type='text'
            name='tipCategory'
            id='tipCategory'
            onChange={this.updateLocalTipData('category')}
            value={category}
          />
          <button type='Submit'>Submit</button>
        </form>
      </div>
    )
  }
}

NewTip.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    avatar: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    name: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  }),
  tips: PropTypes.array.isRequired,
  handleSaveNewTip: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTip)
