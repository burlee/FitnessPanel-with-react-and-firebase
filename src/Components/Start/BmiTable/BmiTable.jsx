import React from 'react'
import classes from './BmiTable.css'

const BmiTable = ({ BMI }) => {
  return (
    <div className={classes.BmiTable}>
       {BMI ? <li style={{marginBottom: '10px'}}>Twoje BMI wynosi: <strong>{BMI}</strong></li> : null}
       <h4>Zakresy wartości BMI:</h4>
       <li>Mniej niż 16 - wygłodzenie</li> 
       <li>16 - 16.99 - wychudzenie</li>
       <li>17 - 18.49 - niedowaga</li>
       <li>18.5 - 24.99 - wartość prawidłowa</li>
       <li>25 - 29.99 - nadwaga</li>
       <li>30 - 34.99 - I stopień otyłości</li>
       <li>35 - 39.99 - II stopień otyłości</li>
       <li>Powyżej 40 - otyłość skrajna</li>
    </div>
  )
}

export default BmiTable;
