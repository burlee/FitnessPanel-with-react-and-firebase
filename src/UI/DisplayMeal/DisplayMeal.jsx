import React from 'react'
import classes from './DisplayMeal.css'

const DisplayMeal = ({deleteMeal, date, name, calories, protein, carbohydrates, fat}) => {
  return (
    <div className={classes.DisplayMeal}>
      <button onClick={deleteMeal}>x</button>
      <p>Data: {date}</p><br/>
      <span style={{color: '#4CAF50'}}>Nazwa: {name}</span> <br/>
      <span>Kalorie: {calories} kcal</span> <br/>
      <span>Białko: {protein} gram</span><br/>
      <span>Węglowodany: {carbohydrates} gram</span><br/>
      <span>Tłuszcze: {fat} gram</span><br/>
    </div>
  )
}

export default DisplayMeal;