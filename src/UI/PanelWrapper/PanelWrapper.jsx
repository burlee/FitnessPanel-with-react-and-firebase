import React from 'react'
import classes from './PanelWrapper.css'

const PanelWrapper = ({wrapperType, children}) => {
  return (
    <main className={[classes.PanelWrapper, classes[wrapperType]].join(' ')}>
      {children}
    </main>
  )
}
export default PanelWrapper;
