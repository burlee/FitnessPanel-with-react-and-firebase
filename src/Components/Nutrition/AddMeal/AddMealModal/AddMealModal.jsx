import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../../../HOC/aux_x';
import classes from './AddMealModal.css';
import FirebaseConfig from '../../../../Config/FirebaseConfig';
import moment from 'moment';
import 'moment/locale/pl';


class Modal extends Component {
    state = {
        meal: {
            name: '',
            calories: ''
        },
        spinnerLoader: false,
        disabledButton: false,
        currentUserIdFB: FirebaseConfig.auth().currentUser.uid
    }
    
    mealDetailsHandler = (event) =>{
        event.preventDefault();

        moment.locale('pl');
        const mealName = event.target.elements.name.value;
        const protein = event.target.elements.protein.value;
        const carbohydrates = event.target.elements.carbohydrates.value;
        const fat = event.target.elements.fat.value;
        
        const data = new Date();
        const year = data.getFullYear();
        const month = data.getMonth()+1;
        const day = data.getDate();
        let fullDate = `${day}/${month}/${year}`;

        const meal = {
            name: this.firstCharToUppercase(mealName),
            calories: (fat * 9 + protein * 4 + carbohydrates * 4),
            macronutrients: {
                protein: protein,
                carbohydrates: carbohydrates,
                fat: fat
            },
            date: fullDate,
            time: moment().format('LT')
        }

        axios.post(`https://fitnesspanel-eb7a2.firebaseio.com/${this.state.currentUserIdFB}/meals.json`, meal)
            .then(response => {
                if(response.status === 200){
                    window.location.reload();
                }
            })
            .catch(error => console.log(error))
    }


    disabledButton = () => {
        setTimeout( () => this.setState({disabledButton: true}), 10)
        setTimeout( () => this.setState({disabledButton: false}), 1000)
    }

    firstCharToUppercase(text){
        return text.slice(0, 1).toUpperCase() + text.slice(1, 100).toLowerCase();
    }
    
    render() {
        return (
            <Aux>
                <div className={classes.Modal} >
                    <form onSubmit={this.mealDetailsHandler}>
                        <label htmlFor="" style={{marginTop: '12px'}}>Nazwa posiłku:</label>
                        <input type="text" name="name" placeholder="Podaj nazwę posiłku..." required autoComplete="off"/>
                        <label htmlFor="">Ilość białka:</label>
                        <input type="number" name="protein" placeholder="Podaj białko..." required autoComplete="off"/>
                        <label htmlFor="">Ilość węglowodanow:</label>
                        <input type="number" name="carbohydrates" placeholder="Podaj węglowodany..." required autoComplete="off"/>
                        <label htmlFor="">Ilość tłuszczy:</label>
                        <input type="number" name="fat" placeholder="Podaj tłuszcz..." required autoComplete="off"/>
                        <button onClick={this.disabledButton} disabled={this.state.disabledButton}>Dodaj posiłek</button>
                    </form> 
                </div>
            </Aux>
        )
    }
}


export default withRouter(Modal);