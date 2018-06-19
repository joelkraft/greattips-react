/* * Tip * */

// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Components
import Ratings from '../Ratings'
import { Link, Redirect } from 'react-router-dom'
import BackButton from '../BackButton'
import EditTip from './EditTip'
import Display from './Display'

// Actions
import { getTip, updateTip } from '../../actions/tips'

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

  save = data => {
    this.props
      .handleUpdateTip({
        ...this.state.tipData,
        ...data
      })
      .then(tipData => this.setState({ isEditing: false, tipData }))
  }

  cancel = () => this.setState({ isEditing: false })

  toggleEditing = () => this.setState({ isEditing: !this.state.isEditing })

  render () {
    const { email } = this.props.user
    const { id } = this.props.match.params
    const { category, text, authorName, authorEmail } = this.state.tipData
    const { save, cancel, toggleEditing } = this

    // For tip URLs that don't exist, send to categories
    if (!text) return <Redirect to='/categories' />

    return (
      <div>
        <p>
          <Link to={`/categories/${category}`}>
            <BackButton />
          </Link>
        </p>
        {this.state.isEditing
          ? <EditTip tipData={{ text, category }} save={save} cancel={cancel} />
          : <Display
            authorEmail={authorEmail === email ? authorEmail : null}
            text={text}
            category={category}
            authorName={authorName}
            handleClick={toggleEditing}
            />}
        <Ratings tipId={id} />
      </div>
    )
  }
}

Tip.propTypes = {
  handleRequestTip: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Tip)
