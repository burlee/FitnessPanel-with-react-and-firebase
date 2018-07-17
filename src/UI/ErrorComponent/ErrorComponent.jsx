import React from 'react'
import Aux from '../../HOC/aux_x'
import classes from './ErrorComponent.css'

const ErrorComponent = () => {
  return (
    <Aux>
       <span className={classes.Error}>Niepoprawne dane</span>
    </Aux>
  )
}

export default ErrorComponent;
