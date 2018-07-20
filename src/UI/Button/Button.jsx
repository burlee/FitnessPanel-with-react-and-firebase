import React from 'react'
import classes from './Button.css'

const Button = ({btnType, clicked, children, disabled}) => {
  return (
    <button 
      disabled={disabled}
      className={[classes.Button, classes[btnType]].join(' ')} 
      onClick={clicked}>
        {children}
    </button>
  )
}

export default Button;