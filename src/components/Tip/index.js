/* * Tip * */

// Libs
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Components
import Ratings from '../Ratings'
import { Link, Redirect } from 'react-router-dom'
import Button from '../Button'
import EditTip from './EditTip'
import Display from './Display'

// Actions
import { getTip, updateTip } from '../../actions/tips'

import './Tip.css'

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
    const { isEditing, tipData } = this.state
    const { category, text, authorName, authorEmail } = tipData
    const { save, cancel, toggleEditing } = this

    // For tip URLs that don't exist, send to categories
    if (!text) return <Redirect to='/categories' />

    return (
      <div className='Tip'>
        <Link to={`/categories/${category}`}>
          <Button />
        </Link>
        <section className='main-view'>
          {isEditing
            ? <EditTip
              tipData={{ text, category }}
              save={save}
              cancel={cancel}
              />
            : <Display
              authorEmail={authorEmail === email ? authorEmail : null}
              text={text}
              category={category}
              authorName={authorName}
              handleClick={toggleEditing}
              />}
          <Ratings tipId={id} />
        </section>
      </div>
    )
  }
}

Tip.propTypes = {
  handleRequestTip: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Tip)
