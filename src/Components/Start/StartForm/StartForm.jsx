import React, { Component } from 'react'
import classes from './StartForm.css'
import Button from '../../../UI/Button/Button'

export default class StartForm extends Component {
  render() {
    return (
      <div className={classes.FormStyle}>
        <h2>Uzupełnij formularz</h2>
        <p>Podaj kilka niezbędnych informacji o sobie.</p>
        <form onSubmit={this.props.getPersonDetails}>
            <label htmlFor="name">Imię</label>
            <input type="text" name="name" id="name" placeholder="Podaj imię..." autoComplete="off" required/>
            <label htmlFor="age">Wiek</label>
            <input type="number" name="age" id="age" placeholder="Podaj wiek..." autoComplete="off" required/>
            <label htmlFor="height">Wzrost</label>
            <input type="number" name="height" id="height" placeholder="Podaj wzrost..." autoComplete="off" required/>
            <label htmlFor="weight">Waga</label>
            <input type="number" name="weight" id="weight" placeholder="Podaj wagę..." autoComplete="off" required/>
            <Button>Uzupełnij</Button>
	      </form>
      </div>
    )
  }
}
