import React, { Component } from 'react'
import classes from '../Excercise.css'
import Aux from '../../../HOC/aux_x';

export default class ExerciseTwo extends Component {
  render() {
      let exercise = (
      <div className={classes.Excercise}>
            <h5>Zestaw drugi</h5>
            <li>10 Pompek</li>
            <li>20 Brzuszkow</li>
            <li>30 Podciągnięć</li>
            <li>40 Wiosłowań</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <button onClick={this.props.excerciseTwoDoneFn}>Wykonane</button>
        </div>)

        if(this.props.exerciseTwoDone || localStorage.getItem('exerciseTwo')){
            exercise = (<div className={classes.ExcerciseDone} >
            <h5>Zestaw drugi</h5>
            <li>10 Pompek</li>
            <li>20 Brzuszkow</li>
            <li>30 Podciągnięć</li>
            <li>40 Wiosłowań</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <button onClick={this.props.excerciseTwoDoneFn}>Wykonane</button>
        </div>)
        }
    return (
      <Aux>
        {exercise}
      </Aux>
    )
  }
}
