import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pl';
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/aux_x';
import FirebaseConfig from '../../../Config/FirebaseConfig';
import CaloriesCounter from '../../../UI/CaloriesCounter/CaloriesCounter';
import DisplayMeal from '../NutritionPanel/DisplayMeal/DisplayMeal';
import Header from '../../../UI/Header/Header';
import PanelWrapper from '../../../UI/PanelWrapper/PanelWrapper';
import WarningModal from './WarningModal/WarningModal'
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './NutritionPanel.css';

export default class NutritionPanel extends PureComponent {
    state = {
        meals: [],
        allCalories: [],
        caloriesSummary: null,
        spinnerLoader: true,
        toggle: false,
        warningModal: false,
        currentUserIdFB: FirebaseConfig.auth().currentUser.uid
    }
    componentDidMount() {
        const updateMeal = [];
        const updateCalories = [];
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${this.state.currentUserIdFB}/meals.json`)
            .then(response => {
                let mealFromDB = response.data;
                for (let key in mealFromDB) {
                    updateCalories.push({
                        calories: parseFloat(mealFromDB[key].calories)
                    })
                    updateMeal.push({
                        id: key,
                        name: mealFromDB[key].name,
                        calories: mealFromDB[key].calories,
                        protein: mealFromDB[key].macronutrients.protein,
                        carbohydrates: mealFromDB[key].macronutrients.carbohydrates,
                        fat: mealFromDB[key].macronutrients.fat,
                        date: mealFromDB[key].date
                    })
                    this.setState({ meals: updateMeal })
                    this.setState({ allCalories: updateCalories })
                }
            })
            .then(() => {
                const calories = [...this.state.allCalories];
                let caloriesSummary = 0;
                for (let i = 0; i < calories.length; i++) {
                    caloriesSummary += calories[i].calories
                }
                this.setState({ caloriesSummary: caloriesSummary, spinnerLoader: false })
                localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}caloriesSummary`, caloriesSummary);
            })
            .catch(error => console.log(error))
    }

    deleteMeal = (mealID, mealCalories) => {
        if(mealID === undefined){this.setState({warningModal: true})}
        else(
        axios.delete(`https://fitnesspanel-eb7a2.firebaseio.com/${this.state.currentUserIdFB}/meals/${mealID}.json`)
            .then(response => {
                if (response.status === 200) {
                    let meals = [...this.state.meals];
                    let caloriesSummary = this.state.caloriesSummary;
                    let mealsFiltered = meals.filter( meal => meal.id !== mealID);
                    this.setState({meals: mealsFiltered, caloriesSummary: caloriesSummary - mealCalories})
                    localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}caloriesSummary`, caloriesSummary - mealCalories);
                }
            })
            .catch(error => console.log(error))
        )
    }

    deleteAllMeal = () => {
        axios.delete(`https://fitnesspanel-eb7a2.firebaseio.com/${this.state.currentUserIdFB}/meals.json`)
            .then(response => {
                if (response.status === 200) {
                    this.setState({meals: []})
                }
            })
            .catch(error => console.log(error))
    }
    //ADD MEAL
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
        
        const addNewMeal = {
            name: this.firstCharToUppercase(mealName),
            calories: (fat * 9 + protein * 4 + carbohydrates * 4),
            protein: protein,
            carbohydrates: carbohydrates,
            macronutrients: {
                protein: protein,
                carbohydrates: carbohydrates,
                fat: fat
            },
            fat: fat,
            date: fullDate,
            time: moment().format('LT')
        }

        axios.post(`https://fitnesspanel-eb7a2.firebaseio.com/${this.state.currentUserIdFB}/meals.json`, addNewMeal)
            .then(response => {
                if(response.status === 200){
                    let meals = [...this.state.meals];
                    let caloriesSummary = this.state.caloriesSummary;
                    meals.push(addNewMeal);
                    this.setState({meals: meals, toggle: false, caloriesSummary: caloriesSummary + addNewMeal.calories});
                    localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}caloriesSummary`, caloriesSummary + addNewMeal.calories);
                }
            })
            .catch(error => console.log(error))
    }

    firstCharToUppercase(text){
        return text.slice(0, 1).toUpperCase() + text.slice(1, 100).toLowerCase();
    }

    toggle = () => {
        this.setState({toggle: !this.state.toggle})
    }

    render() {
        let displayMeals = null;
        let deleteBtn = null;

        if (this.state.meals.length !== 0) {
            displayMeals = this.state.meals.map(meal => {
                return <DisplayMeal
                    key={meal.id}
                    date={meal.date}
                    name={meal.name}
                    calories={meal.calories}
                    protein={meal.protein}
                    carbohydrates={meal.carbohydrates}
                    fat={meal.fat}
                    deleteMeal={() => this.deleteMeal(meal.id, meal.calories)}
                />
            })
            deleteBtn = <button onClick={this.deleteAllMeal} className={classes.DeleteButton}>Usuń wszystkie</button>
        }

        return (
            <div>
                <PanelWrapper wrapperType='DisplayFlex'>
                    <Header>
                        {this.state.meals.length === 0 ? null : <NavLink to="nutrition-details"><i title="Zobacz szczegółowe dane" style={{ fontSize: '40px', color: 'gray' }} className="far fa-chart-bar"></i></NavLink>}
                        {this.state.meals.length === 0 ? null : <CaloriesCounter caloriesSummary={this.state.caloriesSummary} />}
                    </Header>
                        {this.state.warningModal ? <WarningModal WarningModal={this.state.warningModal}/> : null}
                        {displayMeals}
                        {this.state.toggle ?
                        <Aux>
                        <Backdrop show={this.state.toggle} modalClosed={this.toggle}/>
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
                                <button>Dodaj posiłek</button>
                            </form> 
                        </div>
                        </Aux>
                         : null }
                        <button onClick={this.toggle} className={classes.AddMeal}>+</button>
                        {deleteBtn}
                        {this.state.spinnerLoader ? <Spinner /> : null}
                </PanelWrapper>
            </div>
        )
    }
}
