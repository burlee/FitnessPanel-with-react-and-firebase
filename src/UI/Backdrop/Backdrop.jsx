import React from 'react'
import classes from './Backdrop.css'


const Backdrop = ({show, modalClosed}) => {
  return (
    show ? <div className={classes.Backdrop} onClick={modalClosed}></div> : null
  )
};

export default Backdrop;
