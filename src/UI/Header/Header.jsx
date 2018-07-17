import React from 'react'
import classes from './Header.css'

const Header = ({children}) => {
  return (
    <header className={classes.Header}>
      {children}
    </header>
  )
}

export default Header;
