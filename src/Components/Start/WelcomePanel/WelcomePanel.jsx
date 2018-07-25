import React, { Component } from 'react'
import classes from './WelcomePanel.css'
import Button from '../../../UI/Button/Button';

class WelcomePanel extends Component {
  render() {
    return (
      <div className={classes.WelcomePanel}>
        <h2>Witaj w FitnessPanel</h2> <br />
        <p>Rozpocznij swoją przygodę z fitnessem, podaj kilka niezbędnych informacji o sobie, a my obliczymy twoje prawidłowe BMI oraz ilość kalorii jaką powinieneś spożywać każdego dnia.</p>
        <Button clicked={this.props.clicked}>Przejdź dalej</Button>
      </div>
    )
  }
}

export default WelcomePanel;