import React, { Component } from 'react'
import classes from '../Excercise.css'
import Aux from '../../../HOC/aux_x'
import Backdrop from '../../../UI/Backdrop/Backdrop'
import FitnessPicture_1 from '../../../ASSETS/FitnessIcon/img_1.png'
import FitnessPicture_2 from '../../../ASSETS/FitnessIcon/img_2.png'
import FitnessPicture_3 from '../../../ASSETS/FitnessIcon/img_3.png'

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
                src="https://www.youtube.com/embed/0ww_IGRScIo" 
                frameBorder="0" 
                style={{padding: '5px'}}
                allow="autoplay; encrypted-media" 
                allowFullScreen
                ></iframe>
            </div> : null}
            <div className={classes.ExerciseContainer_1}>
              <img src={FitnessPicture_1} alt="FitnessImg"/>
              <p> Ćwiczenia na skakance wpływają na wzrost tętna, poprawę pracy serca i układu krążenia. Dzięki regularnym treningom nie tylko poprawisz swoją kondycję, równowagę i koordynację, lecz także zauważalnie wzmocnisz ciało i wpłyniesz na zwiększenie elastyczności stawów.<span style={{fontWeight: 'bold'}}> Ćwiczenie wykonuj przez 10 minut.</span></p>
            </div>
            <div className={classes.ExerciseContainer_2}>
              <img src={FitnessPicture_2} alt="FitnessImg"/>
              <p>Połóż się na plecach, nogi ugnij w kolanach. Lekko rozszerz stopy. Spleć dłonie za głową, szeroko rozchylając łokcie. Wraz z wydechem unieś tułów kilka centymetrów nad ziemię. Robiąc spięcie, staraj się „wciskać” odcinek lędźwiowy w podłogę i nie odrywaj go od podłoża przez całe ćwiczenie. Robiąc wdech opuść barki. Pamiętaj o stałym napięciu mięśni, nie rozluźniaj ich nawet przy opuszczaniu.<span style={{fontWeight: 'bold'}}>Wykonaj 60 powtorzeń.</span></p>
            </div>
            <div className={classes.ExerciseContainer_3}>
              <img src={FitnessPicture_3} alt="FitnessImg"/>
                <p> Połóż się na plecach z nogami ugiętymi w kolanach. Prawą nogę unieś do góry i oprzyj stopę o kolano. Załóż ręce za głowę i unosząc tułów staraj się dotknąć lewym łokciem do przeciwległego kolana. Odcinek lędźwiowy kręgosłupa pozostaje nieruchomy i dociśnięty do podłoża.
                <span style={{fontWeight: 'bold'}}> Wykonaj 50 powtórzeń.</span>
                </p>
            </div>
            <button 
              style={{backgroundColor: 'transparent', color: '#4c4c4c', width: '200px'}}
              onClick={this.showMovie}>
            Zobacz jak wykonać ćwiczenie
            </button>
            <button onClick={this.props.excerciseOneDoneFn}>Wykonane</button>
        </div>)

        if(this.props.excerciseOneDone || localStorage.getItem('exerciseOne')){
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
                <img src={FitnessPicture_1} alt="FitnessImg"/>
                <p> Ćwiczenia na skakance wpływają na wzrost tętna, poprawę pracy serca i układu krążenia. Dzięki regularnym treningom nie tylko poprawisz swoją kondycję, równowagę i koordynację, lecz także zauważalnie wzmocnisz ciało i wpłyniesz na zwiększenie elastyczności stawów.<span style={{fontWeight: 'bold'}}> Ćwiczenie wykonuj przez 10 minut.</span></p>
              </div>
              <div className={classes.ExerciseContainer_2}>
                <img src={FitnessPicture_2} alt="FitnessImg"/>
                <p>Połóż się na plecach, nogi ugnij w kolanach. Lekko rozszerz stopy. Spleć dłonie za głową, szeroko rozchylając łokcie. Wraz z wydechem unieś tułów kilka centymetrów nad ziemię. Robiąc spięcie, staraj się „wciskać” odcinek lędźwiowy w podłogę i nie odrywaj go od podłoża przez całe ćwiczenie. Robiąc wdech opuść barki. Pamiętaj o stałym napięciu mięśni, nie rozluźniaj ich nawet przy opuszczaniu.<span style={{fontWeight: 'bold'}}> Wykonaj 60 powtórzeń.</span></p>
              </div>
              <div className={classes.ExerciseContainer_3}>
                <img src={FitnessPicture_3} alt="FitnessImg"/>
                <p> Połóż się na plecach z nogami ugiętymi w kolanach. Prawą nogę unieś do góry i oprzyj stopę o kolano. Załóż ręce za głowę i unosząc tułów staraj się dotknąć lewym łokciem do przeciwległego kolana. Odcinek lędźwiowy kręgosłupa pozostaje nieruchomy i dociśnięty do podłoża.
                <span style={{fontWeight: 'bold'}}> Wykonaj 50 powtórzeń.</span>
                </p>
              </div>
              <button onClick={this.props.excerciseOneDoneFn}>Ćwiczenia wykonane <i className="fas fa-check"></i></button>
          </div>)
        }
    return (
      <Aux>
        {exercise}
      </Aux>
    )
  }
}
