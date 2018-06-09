import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { clearUser, login, signup } from '../actions/profile'

import LoginSignupForm from './LoginSignupForm'

const mapStateToProps = state => ({
  isVisible: state.profile.userMenuVisible,
  user: state.profile.userData,
  errors: state.profile.errors
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
        <div>
          {this.props.errors.map(err => (
            <h3 style={{color:'red'}} key={err}>{err}</h3>
          ))}
          {user // Check if user is logged in
            ? <div>
              <Link to='/profile'>Profile</Link>
              <button onClick={logout}>Logout</button>
            </div>
            : <LoginSignupForm handleLogin={login} handleSignup={signup} />}
        </div>
      )
    }
    return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
