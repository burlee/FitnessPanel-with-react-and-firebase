import React from 'react'
import classes from '../../DetailBox/DetailBox.css'
import {NavLink} from 'react-router-dom'

export default () => {
  return (
    <div className={classes.DetailBox}>
      <p>Zobacz swoje</p>
      <NavLink to='/nutrition-details'><i style={{fontSize: '40px'}} className="far fa-chart-bar"></i></NavLink>
      <p>makroskładniki</p>
    </div>
  )
}
