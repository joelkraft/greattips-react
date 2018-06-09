import React from 'react'

const FormField = ({ label, value, handleChange }) => (
  <div key={label}>
    <label>{label}</label>
    {' '}
    <input
      type='text'
      value={value}
      onChange={e => handleChange(e.target.value)}
    />
  </div>
)
export default FormField
