import React, { Component } from 'react'
import classes from '../Excercise.css'
import Aux from '../../../HOC/aux_x'
import Backdrop from '../../../UI/Backdrop/Backdrop'
import FitnessPicture_1 from '../../../ASSETS/FitnessIcon/img_4.png'
import FitnessPicture_2 from '../../../ASSETS/FitnessIcon/img_5.png'
import FitnessPicture_3 from '../../../ASSETS/FitnessIcon/img_6.png'

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
            <Backdrop show={this.state.showMovie} modalClosed={this.showMovie}/>
            {this.state.showMovie ? <div className={classes.Movie}>
              <iframe width="450"
                title="Youtube" 
                height="450" 
                src="https://www.youtube.com/embed/N0Yo1g-NcTI"
                frameBorder="0" 
                style={{padding: '5px'}}
                allow="autoplay; encrypted-media" 
                allowFullScreen
                ></iframe>
            </div> : null}
            <div className={classes.ExerciseContainer_1}>
              <img src={FitnessPicture_1} alt="FitnessImg"/>
              <p> Leżąc na plecach unieś nogi pod kątem prostym – tak, żeby uda były ustawione prostopadle do podłogi. Ręce załóż za głowę, rozchyl łokcie. Zacznij przyciągać raz jedno, raz drugie kolano do klatki piersiowej, a jednocześnie unoś tułów i dotykaj łokciem przeciwległego kolana.</p>
            </div>
            <div className={classes.ExerciseContainer_2}>
              <img src={FitnessPicture_2} alt="FitnessImg"/>
              <p>Połóż się na plecach, wyprostuj ręce i wyciągnij je do tyłu (powinny stanowić przedłużenie tułowia). Nogi wyprostuj i unieś kilka centymetrów nad ziemię. W jednym czasie unieś tułów i ugnij nogi w kolanach przyciągając je do klatki piersiowej. W momencie spięcia ręce wyciągnij przed siebie. Następnie ponownie połóż tułów na podłodze, ręce wyciągnij do tyłu i wyprostuj nogi. Pamiętaj, aby nie kłaść nóg i cały czas trzymać je kilka centymetrów na ziemi.</p>
            </div>
            <div className={classes.ExerciseContainer_3}>
              <img src={FitnessPicture_3} alt="FitnessImg"/>
              <p> Leżąc na plecach unieś nogi pod kątem prostym – tak, żeby uda były ustawione prostopadle do podłogi. Ręce załóż za głowę, rozchyl łokcie. Zacznij przyciągać raz jedno, raz drugie kolano do klatki piersiowej, a jednocześnie unoś tułów i dotykaj łokciem przeciwległego kolana.</p>
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
                <p> Leżąc na plecach unieś nogi pod kątem prostym – tak, żeby uda były ustawione prostopadle do podłogi. Ręce załóż za głowę, rozchyl łokcie. Zacznij przyciągać raz jedno, raz drugie kolano do klatki piersiowej, a jednocześnie unoś tułów i dotykaj łokciem przeciwległego kolana.</p>
              </div>
              <div className={classes.ExerciseContainer_2}>
                <img src={FitnessPicture_2} alt=""/>
                <p>Połóż się na plecach, wyprostuj ręce i wyciągnij je do tyłu (powinny stanowić przedłużenie tułowia). Nogi wyprostuj i unieś kilka centymetrów nad ziemię. W jednym czasie unieś tułów i ugnij nogi w kolanach przyciągając je do klatki piersiowej. W momencie spięcia ręce wyciągnij przed siebie. Następnie ponownie połóż tułów na podłodze, ręce wyciągnij do tyłu i wyprostuj nogi. Pamiętaj, aby nie kłaść nóg i cały czas trzymać je kilka centymetrów na ziemi.</p>
              </div>
              <div className={classes.ExerciseContainer_3}>
                <img src={FitnessPicture_3} alt=""/>
                <p> Leżąc na plecach unieś nogi pod kątem prostym – tak, żeby uda były ustawione prostopadle do podłogi. Ręce załóż za głowę, rozchyl łokcie. Zacznij przyciągać raz jedno, raz drugie kolano do klatki piersiowej, a jednocześnie unoś tułów i dotykaj łokciem przeciwległego kolana.</p>
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
