import classes from './CaloriesCounter.css'
import Aux from '../../HOC/aux_x'
import React, { Component } from 'react'
import FirebaseConfig from '../../Config/FirebaseConfig'

const statusBarStyle = {
    borderRadius: '3px',
    height: '10px',
    backgroundColor: '#4CAF50',
    transition: 'all .8s ease-in-out'
}

class CaloriesCounter extends Component {
    state = {
        insertCalories: null,
        showCaloriesCounter: false,
        localStorageCalory: localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}calory`)
    }

    insertCaloriesHandler = () => {
        if (this.state.insertCalories === null) return;
        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}calory`, this.state.insertCalories)
        this.setState({
            showCaloriesCounter: true
        })
    }

    resetCaloriesCounter = () => {
        localStorage.removeItem(`${FirebaseConfig.auth().currentUser.uid}calory`);
        window.location.reload();
    }

    render() {
        let caloriesCounter = (
            <div className={classes.AddCalories}>
                <button onClick={this.insertCaloriesHandler}>+</button>
                <input placeholder="Kontroluj swoją liczę kalorii..." type="number" onChange={(e) => this.setState({ insertCalories: e.target.value })} />
            </div>
        )

        if (this.state.localStorageCalory > 0 || this.state.showCaloriesCounter) {
            caloriesCounter = (
                <div className={classes.CaloriesCounter}>
                    <div style={{ ...statusBarStyle, maxWidth: ((this.props.caloriesSummary / (this.state.insertCalories ? this.state.insertCalories : this.state.localStorageCalory)) * 100) + '%' }}>
                        <p>Dzisiaj spożyłeś {this.props.caloriesSummary}/{this.state.localStorageCalory ? this.state.localStorageCalory : this.state.insertCalories} kcal. <span onClick={this.resetCaloriesCounter}>Resetuj licznik.</span> </p>
                    </div>
                </div>)
        }
        return (
            <Aux>
                {caloriesCounter}
            </Aux>
        )
    }
}

export default CaloriesCounter;