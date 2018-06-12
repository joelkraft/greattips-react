// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Components
import ActionBar from '../ActionBar'
import Ratings from '../Ratings'
import { Link } from 'react-router-dom'
import BackButton from '../BackButton'
import EditForm from './EditForm'

// Actions
import { getTip, updateTip } from '../../actions/tips'
import Display from './Display'

const mapStateToProps = state => ({
  tips: state.tips.tips,
  user: state.profile.userData
})

const mapDispatchToProps = dispatch => ({
  handleRequestTip: id => dispatch(getTip(id)),
  handleUpdateTip: tipData => dispatch(updateTip(tipData))
})

class Tip extends React.Component {
  state = {
    tipData: {
      ...this.props.tips.find(
        tip => tip.id.toString() === this.props.match.params.id
      )
    },
    isEditing: false
  }

  saveTip = data => {
    this.props
      .handleUpdateTip({ ...this.state.tipData, ...data })
      .then(tipData => this.setState({ isEditing: false, tipData }))
  }

  render () {
    const { category, text, authorName, authorEmail } = this.state.tipData
    return (
      <div>
        <p>
          <Link to={`/categories/${category}`}>
            <BackButton />
          </Link>
        </p>
        {this.state.isEditing
          ? <EditForm
            initialState={{ text, category }}
            submit={this.saveTip}
            cancel={() => this.setState({ isEditing: false })}
            />
          : <Display
            authorEmail={
                authorEmail === this.props.user.email.value ? authorEmail : null
              }
              text={text}
              category={category}
              authorName={authorName}
              handleClick={() => this.setState({ isEditing: !this.state.isEditing })}
            />}
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
