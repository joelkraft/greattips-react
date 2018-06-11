import React from 'react'
import { PropTypes } from 'prop-types'

import ActionBar from './ActionBar'

import { connect } from 'react-redux'

import { saveNewTip } from '../actions/tips'
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
  updateLocalTipData = (label, value) => {
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
      authorEmail: this.props.userData.email.value,
      authorName: this.props.userData.name.value
    }
    this.props
      .handleSaveNewTip(newTip)
      .then(result => this.setState(defaultState))
  }
  cancelEditUserData () {
    this.setState({ isEditing: false, localUserData: this.props.userData })
  }
  render () {
    return (
      <div>
        <h1>New Tip</h1>
        <form onSubmit={this.saveNewTip}>
          <label htmlFor='tipText'>Tip Text</label>
          <textarea
            name='tipText'
            id='tipText'
            cols='30'
            rows='10'
            onChange={e => this.updateLocalTipData('text', e.target.value)}
            value={this.state.tipData.text}
          />
          <label htmlFor='tipCategory'>Category</label>
          <input
            type='text'
            name='tipCategory'
            id='tipCategory'
            onChange={e => this.updateLocalTipData('category', e.target.value)}
            value={this.state.tipData.category}
          />
          <button type='Submit'>Submit</button>
        </form>
        <ActionBar />
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
