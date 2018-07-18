import React from 'react'
import classes from '../../DetailBox/DetailBox.css'
import { NavLink } from 'react-router-dom'

export default () => {
  return (
    <div className={classes.DetailBox}>
      <p>Wygeneruj plik</p>
      <NavLink to='/activityDetails'><i style={{fontSize: '40px'}} className="far fa-file-pdf"></i></NavLink>
      <p>PDF</p>
    </div>
  )
}
