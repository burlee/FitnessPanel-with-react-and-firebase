import React, { Component } from 'react'
import classes from '../Excercise.css'
import Aux from '../../../HOC/aux_x'
import Backdrop from '../../../UI/Backdrop/Backdrop'
import FitnessPicture_1 from '../../../ASSETS/FitnessIcon/Fitness_gym_gymnastic_health_exercise_sport_jump_rope-512.png'
import FitnessPicture_2 from '../../../ASSETS/FitnessIcon/Fitness_gym_gymnastic_health_exercise_run_sport_stamina_man-512.png'
import FitnessPicture_3 from '../../../ASSETS/FitnessIcon/Fitness_gym_gymnastic_health_exercise_run_sport_stamina_training-512.png'

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
            <h5>Zestaw drugi</h5>
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
            <div className={classes.ExerciseContainer_1}>
              <img src={FitnessPicture_1} alt="FitnessImg"/>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quae!</p>
            </div>
            <div className={classes.ExerciseContainer_2}>
              <img src={FitnessPicture_2} alt="FitnessImg"/>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quae!</p>
            </div>
            <div className={classes.ExerciseContainer_3}>
              <img src={FitnessPicture_3} alt="FitnessImg"/>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quae!</p>
            </div>
            <button 
              style={{backgroundColor: 'transparent', color: '#4c4c4c', width: '200px'}}
              onClick={this.showMovie}>
            Zobacz jak wykonać ćwiczenie
            </button>
            <button onClick={this.props.excerciseTwoDoneFn}>Wykonane</button>
        </div>)

        if(this.props.excerciseTwoDone || localStorage.getItem('exerciseTwo')){
            exercise = (<div className={classes.ExcerciseDone}>
              <h5>Zestaw drugi</h5>
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
              <div className={classes.ExerciseContainer_1}>
                <img src={FitnessPicture_1} alt=""/>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quae!</p>
              </div>
              <div className={classes.ExerciseContainer_2}>
                <img src={FitnessPicture_2} alt=""/>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quae!</p>
              </div>
              <div className={classes.ExerciseContainer_3}>
                <img src={FitnessPicture_3} alt=""/>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quae!</p>
              </div>
              <button onClick={this.props.excerciseTwoDoneFn}>Ćwiczenia wykonane <i class="fas fa-check"></i></button>
          </div>)
        }
    return (
      <Aux>
        {exercise}
      </Aux>
    )
  }
}
