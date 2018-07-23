import React from 'react'
import classes from '../../DetailBox/DetailBox.css'
import {NavLink} from 'react-router-dom'

export default () => {
  return (
    <div className={classes.DetailBox}>
      <p>Znajdź zdrowy</p>
      <NavLink to='/recipes'><i style={{fontSize: '40px'}} className="fas fa-utensils"></i></NavLink>
      <p>przepis</p>
    </div>
  )
}
