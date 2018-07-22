import React, { Component } from 'react'
import classes from './RecipeDetails.css'
import Aux from '../../../HOC/aux_x';
import Backdrop from '../../../UI/Backdrop/Backdrop';

export default class RecipeDetails extends Component {
  render() {
    return (
        <Aux>
            <Backdrop show={this.props.show} modalClosed={this.props.toggle}/>
            <div className={classes.RecipeDetails}>
                <h1>{this.props.recipeName}</h1>
                <img src={`${this.props.url}`} alt={`${this.props.recipeName}`}/>
                <div className={classes.Information}>
                    <span><i className="far fa-clock"></i> {this.props.time} minut</span>
                    <span>Poziom trudności: {this.props.level}</span>
                    <span>{this.props.calories} kalorii</span>
                </div>
                <h4>Przygotuj danie według poniższego przepisu:</h4>
                <p>{this.props.recipeDescribe}</p>
            </div>
        </Aux>
    )
  }
}
