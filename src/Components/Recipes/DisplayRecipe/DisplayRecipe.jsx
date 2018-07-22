import React from 'react'
import classes from '../DisplayRecipe/DisplayRecipe.css'

const DisplayMeal = ({showRecipeDetails, name, calories, time, url}) => {
  return (
    <div className={classes.DisplayRecipe} style={{backgroundImage:`url(${url})`}}>
      <header>{name}</header>
      <h5 onClick={showRecipeDetails}>Zobacz przepis</h5>
      <div className={classes.Information}>
        <span><i className="far fa-clock"></i> {time} minut</span>
        <span>{calories} kalorii</span>
      </div>
    </div>
  )
}

export default DisplayMeal;