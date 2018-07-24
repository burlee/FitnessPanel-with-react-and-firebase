import axios from 'axios';
import React, { Component } from 'react';
import FirebaseConfig from '../../../Config/FirebaseConfig';
import Aux from '../../../HOC/aux_x';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Footer from '../../../UI/Footer/Footer'
import classes from './RecipeDetails.css';

export default class RecipeDetails extends Component {
    state = {
        currentUser: FirebaseConfig.auth().currentUser.uid,
        recipeID: this.props.recipeID,
        currentUserFromList: [],
        rate: 0,
        disabled: false,
        btnTextValue: 'Polecam przepis!',
        displayBtn: 'none'
    }

    componentDidMount() {

        //Check which user like recipe
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/userLikeItList/${this.state.currentUser}.json`)
            .then(response => {
                const currentUserFromListUpdate = [...this.state.currentUserFromList];
                for (let key in response.data) {
                    currentUserFromListUpdate.push({
                        currentUserFromList: response.data[key].currentUser,
                        recipeIDfromList: response.data[key].recipeID
                    })
                }
                this.setState({ currentUserFromList: currentUserFromListUpdate })
            })
            .then(() => {
                this.state.currentUserFromList.forEach( recipeValue => {
                    let result = Object.values(recipeValue);
                    if (this.state.currentUser === result[0] && this.state.recipeID === result[1]) {
                        this.setState({ disabled: true })
                    }
                })
            })
            .then(() => { if(this.state.disabled === false){this.setState({displayBtn: 'block'})}})
            .catch(error => console.log(error))

        //Information about recipe rate
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/rates/${this.props.recipeID}.json`)
            .then(response => {
                this.setState({ rate: response.data.rate })
            })
            .catch(error => error)
    }

    giveRateFn = () => {

        this.setState({disabled: true, btnTextValue: 'Dziękujemy za opinię!'})

        const rate = {
            rate: this.state.rate + 1
        }

        const currentUser = { currentUser: this.state.currentUser, recipeID: this.state.recipeID }

        axios.post(`https://fitnesspanel-eb7a2.firebaseio.com/userLikeItList/${this.state.currentUser}.json`, currentUser)

        axios.put(`https://fitnesspanel-eb7a2.firebaseio.com/rates/${this.state.recipeID}.json`, rate)
            .then(() => {
                this.setState({ rate: this.state.rate + 1 })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} modalClosed={this.props.toggle} />
                <div className={classes.RecipeDetails}>
                    <h1>{this.props.recipeName}</h1>
                    <img src={`${this.props.url}`} alt={`${this.props.recipeName}`} />
                    <div className={classes.Information}>
                        <span><i className="far fa-clock"></i> {this.props.time} minut</span>
                        <span>Poziom trudności: {this.props.level}</span>
                        <span>{this.props.calories} kalorii</span>
                        <span><i className="fas fa-thumbs-up"></i> {this.state.rate}</span>
                    </div>
                    <h4>Przygotuj danie według poniższego przepisu:</h4>
                    <p>{this.props.recipeDescribe}</p>
                    <button 
                        disabled={this.state.disabled} 
                        style={{display: this.state.displayBtn}} 
                        onClick={this.giveRateFn}>
                            <i className="fas fa-thumbs-up"></i> {this.state.btnTextValue}
                    </button>
                    <Footer/>
                </div>
            </Aux>
        )
    }
}
