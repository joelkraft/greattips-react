import React from 'react'
import { PropTypes } from 'prop-types'

const ProfileDisplay = ({ name, email }) => (
  <table>
    <tbody>
      <tr>
        <td>Name</td>
        <td>{name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{email}</td>
      </tr>
    </tbody>
  </table>
)

ProfileDisplay.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string
}

export default ProfileDisplay
