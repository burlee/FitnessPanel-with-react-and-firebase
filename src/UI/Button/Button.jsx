import React from 'react'
import classes from './Button.css'


const Button = ({btnType, clicked, children}) => {
  return (
    <button 
      className={[classes.Button, classes[btnType]].join(' ')} 
      onClick={clicked}>
        {children}
    </button>
  )
}

export default Button;