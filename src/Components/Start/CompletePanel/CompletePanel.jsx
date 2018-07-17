import React, { Component } from 'react'
import classes from './CompletePanel.css'
import axios from 'axios';
import Aux from '../../../HOC/aux_x'
import Header from '../../../UI/Header/Header';
import FirebaseConfig from '../../../Config/FirebaseConfig'
import PanelWrapper from '../../../UI/PanelWrapper/PanelWrapper';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Weight from './DetailBox/Weight/Weight';
import StartWeight from './DetailBox/StartWeight/StartWeight';
import CaloriesSummary from './DetailBox/CaloriesSummary/CaloriesSummary';
import Macronutrients from './DetailBox/Macronutrients/Macronutrients';
import BMI from './DetailBox/BMI/BMI';
import WeightProgress from './DetailBox/WeightProgress/WeightProgress'

export default class CompletePanel extends Component {
    state ={
        userExist: 'none',
        age : '',
        name : localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}name`),
        height : '',
        weight: '',
        currentWeight: localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}weight`),
        BMI: localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}BMI`),
        showTable: false      
    }
    
    componentDidMount(){
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/user.json`)
        .then(response => {
            for(let key in response.data){
                this.setState({
                    age: response.data[key].age,
                    name: response.data[key].name,
                    height: response.data[key].height,
                    weight: response.data[key].weight
                })
            }
            if(response.data === null){
                this.setState({userExist: 'block'})
            }
        })
    }
    
    successFillProfil = () => {
        this.props.history.push('/profil')
    }
    showTable = () => {
        const showTable = this.state.showTable;
        this.setState({showTable: !showTable})
    }
    render() {
        
    let userExist = null
    let userDetails = null

    if(this.state.name){
        userExist = ( 
        <Header>
            <Aux>
                <h5 className={classes.PanelHeader}>Witaj {this.state.name} w swoim FitnessPanelu</h5>
            </Aux>
        </Header>)
    }
    if(this.state.name){
        userDetails = (
        <Aux>
            <CaloriesSummary/>
            <Macronutrients/>
            <StartWeight/>
            <WeightProgress currentWeight={this.state.currentWeight}/>
            <Weight userHeight={this.state.height}/>
            <BMI showTable={this.state.showTable} showTableFn={this.showTable} BMI={this.state.BMI}/>
        </Aux>)
    }

    return (
        <Aux>
            <PanelWrapper wrapperType='DisplayFlex'>
                {userExist}
                <div className={classes.welcomeDiv} style={{display: this.state.userExist}}>
                    <p className={classes.welcomeText} style={{display: this.state.userExist}}>Rozpocznij od uzupełnienia profilu.</p>
                    <button className={classes.FillProfilBtn} style={{display: this.state.userExist, margin: '0 auto'}} onClick={this.successFillProfil}>Uzupełnij profil</button>
                </div>
                <Backdrop show={this.state.showTable} modalClosed={this.showTable}/>
                {userDetails}
            </PanelWrapper>
        </Aux>
        )
    }
}
