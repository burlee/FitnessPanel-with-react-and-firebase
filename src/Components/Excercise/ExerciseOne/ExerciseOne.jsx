import React, { Component } from 'react'
import classes from '../Excercise.css'
import Aux from '../../../HOC/aux_x'
import Backdrop from '../../../UI/Backdrop/Backdrop'

export default class ExerciseOne extends Component {
  state = {
    showMovie: false
  }

  showMovie = () =>{
    const showMovie = !this.state.showMovie;
    this.setState({showMovie: showMovie})
  }

  render() {
      let exercise = (
      <div className={classes.Excercise}>
            <h5>Zestaw pierwszy</h5>
            <Backdrop show={this.state.showMovie} modalClosed={this.showMovie}/>

            {this.state.showMovie ? <div className={classes.Movie}>
              <iframe width="450"
                title="Youtube" 
                height="450" 
                src="https://www.youtube.com/embed/0ww_IGRScIo" 
                frameBorder="0" 
                style={{padding: '5px'}}
                allow="autoplay; encrypted-media" 
                allowFullScreen
                ></iframe>
            </div> : null}

            <li>10 Pompek</li>
            <li>20 Brzuszkow</li>
            <li>30 Podciągnięć</li>
            <li>40 Wiosłowań</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <button onClick={this.props.excerciseOneDoneFn}>Wykonane</button>
            <button 
              style={{backgroundColor: '#4CAF50'}}
              onClick={this.showMovie}>
            Zobacz wideo
            </button>
        </div>)

        if(this.props.excerciseOneDone || localStorage.getItem('exerciseOne')){
            exercise = (<div className={classes.ExcerciseDone} >
            <h5>Zestaw pierwszy</h5>
            <li>10 Pompek</li>
            <li>20 Brzuszkow</li>
            <li>30 Podciągnięć</li>
            <li>40 Wiosłowań</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <li>50 Przysiadow</li>
            <button className={classes.ExcerciseDoneBtn} onClick={this.props.excerciseOneDoneFn}>Wykonane</button>
        </div>)
        }
    return (
      <Aux>
        {exercise}
      </Aux>
    )
  }
}
