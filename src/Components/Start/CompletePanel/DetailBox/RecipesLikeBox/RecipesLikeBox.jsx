import React, { Component } from 'react'
import axios from 'axios'
import classes from '../../DetailBox/DetailBox.css';

export default class RecipesLikeBox extends Component {
    state = {
        RecipesLikesArray: [],
        recipeLikesValue: 0
    }
    componentDidMount(){
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/rates.json`)
            .then( response => {
                const RecipesLikesArray = [];
                    for(let key in response.data){
                        RecipesLikesArray.push({
                            LikesValue: response.data[key].rate
                        })
                    }
                this.setState({RecipesLikesArray})
                }
            )
            .then(()=>{
                const RecipesLikesArrayCopy = [...this.state.RecipesLikesArray];
                let LikeValue = 0;

                //Counter all Likes from recipes
                RecipesLikesArrayCopy.forEach( value => {
                    LikeValue += parseFloat(Object.values(value))
                });
                
                this.setState({recipeLikesValue: LikeValue})
            })
    }
    render() {
        return (
            <div className={classes.DetailBox}>
                <p>Przepisy poleciło </p>
                <span>{this.state.recipeLikesValue}</span>
                <p>osób</p>
            </div>
        )
    }
}
