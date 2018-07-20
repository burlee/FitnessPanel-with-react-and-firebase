import axios from 'axios';
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import FirebaseConfig from '../../../Config/FirebaseConfig';
import CaloriesCounter from '../../../UI/CaloriesCounter/CaloriesCounter';
import DisplayMeal from '../NutritionPanel/DisplayMeal/DisplayMeal';
import Header from '../../../UI/Header/Header';
import PanelWrapper from '../../../UI/PanelWrapper/PanelWrapper';
import Spinner from '../../../UI/Spinner/Spinner';
import AddMeal from '../AddMeal/AddMeal';
import classes from './NutritionPanel.css';

export default class NutritionPanel extends PureComponent {
    state = {
        meals: [],
        isLoading: false,
        allCalories: [],
        caloriesSummary: null,
        spinnerLoader: false,
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
                this.setState({ caloriesSummary: caloriesSummary })
                localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}caloriesSummary`, caloriesSummary);
            })
            .catch(error => console.log(error))
    }

    deleteMeal = (mealID, mealCalories) => {
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
                        {displayMeals}
                    <AddMeal />
                        {deleteBtn}
                        {this.state.spinnerLoader ? <Spinner /> : null}
                </PanelWrapper>
            </div>
        )
    }
}
