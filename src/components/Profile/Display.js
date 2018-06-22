import React from 'react'
import { PropTypes } from 'prop-types'

const ProfileDisplay = ({ name, email }) => (
  <div className='display'>
    <p className='label'>Name</p>
    <p>{name}</p>
    <p className='label'>Email</p>
    <p>{email}</p>
  </div>
)

ProfileDisplay.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string
}

export default ProfileDisplay
