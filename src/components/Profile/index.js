// Profile.js
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

// Components
import EditProfile from './EditProfile'
import Display from './Display'

// Actions
import { saveUserData } from '../../actions/profile'

const mapStateToProps = state => ({
  userData: state.profile.userData
})
const mapDispatchToProps = dispatch => ({
  handleSaveUserData: data => dispatch(saveUserData(data))
})

class Profile extends React.Component {
  state = {
    isEditing: false,
    userData: this.props.userData
  }

  toggleEditing = () => this.setState({ isEditing: !this.state.isEditing })

  saveUserData = data =>
    this.props
      .handleSaveUserData({ ...this.state.userData, ...data })
      .then(({ data }) => this.setState({ userData: data, isEditing: false }))

  render () {
    const { userData, isEditing } = this.state
    const { name, email } = userData
    const { saveUserData, toggleEditing } = this

    return (
      <div>
        {isEditing
          ? <EditProfile
            save={saveUserData}
            cancel={toggleEditing}
            userData={userData}
            />
          : <div>
            <button onClick={toggleEditing}>
              Edit
            </button>
            <Display name={name} email={email} />
          </div>}
      </div>
    )
  }
}

Profile.propTypes = {
  handleSaveUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
