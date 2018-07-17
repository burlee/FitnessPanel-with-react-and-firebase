import classes from '../../DetailBox/DetailBox.css'
import React, { Component } from 'react'
import FirebaseConfig from '../../../../../Config/FirebaseConfig'
import Aux from '../../../../../HOC/aux_x'

export default class Weight extends Component {
    state = {
        caloriesSummary: null
    }

    componentDidMount() {
        this.setState({
            caloriesSummary: localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}caloriesSummary`),
        })
    }
    
    render() {
    let caloriesSummary =(<Aux>
        <p>Dzisiaj spożyłeś</p>
        <span>{this.state.caloriesSummary}</span>
        <p>KCAL</p>
        </Aux>)

    if(this.state.caloriesSummary === null){
        caloriesSummary = (<Aux>
            <p>Dzisiaj spożyłeś</p>
            <span>0</span>
            <p>KCAL</p>
            </Aux>)
    }
        return (
            <div className={classes.DetailBox}>
            {caloriesSummary}
            </div>
        )
    }
}
