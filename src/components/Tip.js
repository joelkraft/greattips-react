import React from 'react'
import { PropTypes } from 'prop-types'

import ActionBar from './ActionBar'
import Ratings from './Ratings'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { getTip, updateTip } from '../actions/tips'
const mapStateToProps = state => ({
  tips: state.tips.tips,
  user: state.profile.userData
})
const mapDispatchToProps = dispatch => ({
  handleRequestTip: id => dispatch(getTip(id)),
  handleUpdateTip: tipData => dispatch(updateTip(tipData))
})

const defaultState = {
  mainTipData: {
    text: '',
    category: ''
  },
  isEditing: false
}

class Tip extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ...defaultState }
  }
  getTipData = ({ text, category, authorEmail, authorName, id }) => ({
    text,
    category,
    authorEmail,
    authorName,
    id
  })
  componentDidMount () {
    // check if tip is present in memory, otherwise request it from api
    const id = this.props.match.params.id
    const inMemoryTip = this.props.tips.find(tip => tip.id.toString() === id)
    if (inMemoryTip) {
      const tipObj = this.getTipData(inMemoryTip)
      this.setState({
        origTipData: { ...tipObj },
        mainTipData: { ...tipObj }
      })
    } else {
      this.props.handleRequestTip(id).then(({ tip }) =>
        this.setState({
          origTipData: { ...tip },
          mainTipData: { ...tip }
        })
      )
    }
  }
  saveTip = e => {
    e.preventDefault()
    this.setState({ isEditing: false })
    this.props.handleUpdateTip(this.state.mainTipData)
  }
  setVal = (key, value) =>
    this.setState({ mainTipData: { ...this.state.mainTipData, [key]: value } })
  render () {
    return (
      <div>
        <p>
          <Link to={`/categories/${this.state.mainTipData.category}`}>
            {'< Back'}
          </Link>
        </p>
        {this.state.isEditing
          ? <form onSubmit={this.saveTip}>
            <label>Tip</label>
            <input
              type='text'
              value={this.state.mainTipData.text}
              onChange={e => this.setVal('text', e.target.value)}
              />
            <label>Category</label>
            <input
              type='text'
              value={this.state.mainTipData.category}
              onChange={e => this.setVal('category', e.target.value)}
              />
            <button type='submit'>Save</button>
            <button
              type='button'
              onClick={() =>
                  this.setState({
                    mainTipData: { ...this.state.origTipData },
                    isEditing: false
                  })}
              >
                Cancel
              </button>
          </form>
          : <div>
            <h1>Tip</h1>
            <p>{this.state.mainTipData.text}</p>
            <h2>Category</h2>
            <p>{this.state.mainTipData.category}</p>
          </div>}
        {this.state.mainTipData.authorName &&
          <p><b>Author:</b> {this.state.mainTipData.authorName}</p>}
        {this.state.mainTipData.authorEmail === this.props.user.email.value &&
          !this.state.isEditing &&
          <button
            onClick={() => this.setState({ isEditing: !this.state.isEditing })}
          >
            Edit tip
          </button>}
        <Ratings tipId={this.props.match.params.id} />
        <ActionBar />
      </div>
    )
  }
}

Tip.propTypes = {
  handleRequestTip: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Tip)
