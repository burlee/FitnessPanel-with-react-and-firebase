import React from 'react'
import classes from './Paragraph.css'

const Paragraph = (props) => {
  return (
    <p className={classes.Paragraph}>{props.children}</p>
  )
}


export default Paragraph;