import React from 'react'

import './Button.css'

const Button = ({ handler, children, type, disabled }) => (
  <button className='button' type={type || 'button'} onClick={handler} disabled={disabled}>
    {children || '<'}
  </button>
)

export default Button
