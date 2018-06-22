import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { clearUser, login, signup } from '../actions/profile'

import LoginSignupForm from './LoginSignupForm'
import Button from './Button'

import './UserMenu.css'

const mapStateToProps = state => ({
  isVisible: state.profile.userMenuVisible,
  user: state.profile.userData
})
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(clearUser()),
  login: loginData => dispatch(login(loginData)),
  signup: signupData => dispatch(signup(signupData))
})
class UserMenu extends React.Component {
  state = {}

  submit = () => this.props.login(this.state)

  setVal = (label, value) => {
    this.setState({ [label]: value })
  }
  saveUserData () {
    // this.setState({ isEditing: false });
    // this.props.handleSaveUserData(this.state.localUserData)
  }
  cancelEditUserData () {
    // this.setState({ isEditing: false, localUserData: this.props.userData });
  }
  render () {
    const { isVisible, user, login, logout, signup } = this.props
    if (isVisible) {
      return (
        <div className="user-menu">
          {user // Check if user is logged in
            ? <div>
              <Link to='/profile'>Go to profile</Link>
              <p onClick={logout}>Logout</p>
            </div>
            : <LoginSignupForm handleLogin={login} handleSignup={signup} />}
        </div>
      )
    }
    return null
  }
}

UserMenu.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
