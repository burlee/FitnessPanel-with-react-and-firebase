import React from 'react'
import classes from './PanelWrapper.css'

const PanelWrapper = ({wrapperType, children}) => {
  return (
    <div className={[classes.PanelWrapper, classes[wrapperType]].join(' ')}>
      {children}
    </div>
  )
}
export default PanelWrapper;
