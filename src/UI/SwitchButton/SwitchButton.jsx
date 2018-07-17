import React from 'react'
import Aux from '../../HOC/aux_x'
import classes from './SwitchButton.css'
import { NavLink } from 'react-router-dom'

const SwitchButton = ({link, children}) => {
  return (
    <Aux>
        <NavLink className={classes.SwitchButton} to={link}>{children}</NavLink>
    </Aux>
  )
}

export default SwitchButton;
