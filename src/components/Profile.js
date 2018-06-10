import React from 'react'
import { PropTypes } from 'prop-types'

import ActionBar from './ActionBar'
import FormField from './FormField'

import { connect } from 'react-redux'

import { saveUserData } from '../actions/profile'
const userDataOrder = ['name', 'email', 'avatar']
const mapData = (obj, fn) => key => fn(obj[key])

const mapStateToProps = state => ({
  userData: state.profile.userData
})
const mapDispatchToProps = dispatch => ({
  handleSaveUserData: data => dispatch(saveUserData(data))
})
class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      localUserData: this.props.userData
    }
  }
  setToEditing () {
    this.setState({ isEditing: true })
  }
  setVal (key, value) {
    this.setState({
      localUserData: {
        ...this.state.localUserData,
        [key]: {
          ...this.state.localUserData[key],
          value
        }
      }
    })
  }

  saveUserData () {
    this.setState({ isEditing: false })
    this.props.handleSaveUserData(this.state.localUserData)
  }
  cancelEditUserData () {
    this.setState({ isEditing: false, localUserData: this.props.userData })
  }

  render () {
    return (
      <div>
        {this.state.isEditing
          ? <div>
            <button onClick={this.saveUserData.bind(this)}>
                Save
              </button>
            <button onClick={this.cancelEditUserData.bind(this)}>
                Cancel
              </button>
            {userDataOrder.map(
                key => (
                  <FormField
                    key={key}
                    label={this.state.localUserData[key].label}
                    value={this.state.localUserData[key].value}
                    handleChange={value => {
                      this.setVal(key, value)
                    }}
                  />
                ),
                this
              )}
          </div>
          : <div>
            <button onClick={this.setToEditing.bind(this)}>
                Edit
              </button>
            <table>
              <tbody>
                {userDataOrder.map(
                    mapData(this.state.localUserData, obj => (
                      <tr key={obj.label}>
                        <td>{obj.label}</td>
                        <td>{obj.value}</td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>}
        <ActionBar />
      </div>
    )
  }
}

Profile.propTypes = {
    handleSaveUserData: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
