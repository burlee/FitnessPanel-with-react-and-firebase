import React from 'react'
import classes from '../../DetailBox/DetailBox.css'
import BmiTable from '../../../BmiTable/BmiTable';

export default ({showTable, showTableFn, BMI}) => {
  return (
    <div style={{cursor: 'pointer'}} onClick={showTableFn} className={classes.DetailBox}>
      <p>Twoje</p>
      <span style={{color:`${BMI > 25 ? '#f44336' : '#4caf50'}`}}>{BMI}</span>
      <p>BMI</p>
      {showTable ? <BmiTable BMI={BMI}/> : null}
    </div>
  )
}
