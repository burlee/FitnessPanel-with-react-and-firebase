import React, { Component } from 'react'
import classes from './CompletePanel.css'
import classesBox from './DetailBox/DetailBox.css'
import axios from 'axios';
import Aux from '../../../HOC/aux_x'
import { DebounceInput } from 'react-debounce-input'
import Header from '../../../UI/Header/Header';
import FirebaseConfig from '../../../Config/FirebaseConfig'
import PanelWrapper from '../../../UI/PanelWrapper/PanelWrapper';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import StartWeight from './DetailBox/StartWeight/StartWeight';
import Recipes from './DetailBox/Recipes/Recipes'
import CaloriesSummary from './DetailBox/CaloriesSummary/CaloriesSummary';
import Macronutrients from './DetailBox/Macronutrients/Macronutrients';
import BMI from './DetailBox/BMI/BMI';
import WeightProgress from './DetailBox/WeightProgress/WeightProgress'
import PDF from './DetailBox/PDF/PDF';
import Spinner from '../../../UI/Spinner/Spinner';
import RecipesLikeBox from './DetailBox/RecipesLikeBox/RecipesLikeBox';
import ProgressModal from '../ProgressModal/ProgressModal';

export default class CompletePanel extends Component {
    state ={
        BMI: localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}BMI`),
        name : localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}name`),
        currentWeight: parseFloat(localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}weight`)),
        userExist: 'none',
        age : '',
        height : '',
        weight: '',
        newUserWeight: '',
        showTable: false,
        showWeightInput: false,
        showProgressModal: false,
        weightValue: null,
        spinnerLoader: true,
        recipesLike: ''
    }

    showProgressModal = () => {
        this.setState({showProgressModal: !this.state.showProgressModal})
    }
    
    showWeightBtn = () => {
        const showWeightInput = !this.state.showWeightInput;
        this.setState({showWeightInput})
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
                    this.setState({spinnerLoader: false})
                }
                if(response.data === null){
                    this.setState({userExist: 'block', spinnerLoader: false})
                }
            })
            .catch(error => error)
    
            axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userWeight.json`)
                .then( response => {
                    this.setState({newUserWeight: response.data.weight})
                })   
                .catch(error => error)
    }
    
  
    successFillProfil = () => {
        this.props.history.push('/profil')
    }

    showTable = () => {
        const showTable = this.state.showTable;
        this.setState({showTable: !showTable})
    }

    updateUserWeight = (event) => {
        const typeUserWeight = event.target.value.slice(0,3);

        const BMIValue = (typeUserWeight / (this.state.height * this.state.height) * 10000).toFixed(2);

        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}BMI`, this.state.BMI);
        this.setState({
            newUserWeight: typeUserWeight,
            BMI: BMIValue,
            currentWeight: parseFloat(typeUserWeight) 
        })

    }
    
    updateUser = () =>{
        const userWeight = {
            weight: this.state.newUserWeight
        };

        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}BMI`, this.state.BMI);
        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}weight`, this.state.currentWeight);

        this.setState({showWeightInput: false})
        axios.put(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userWeight.json`, userWeight)
    }
   
    render() {

    let userExist = null

    if(this.state.name){
        userExist = ( 
        <Aux>
            <Header>
                    <h5 className={classes.PanelHeader}>Witaj {this.state.name} w swoim FitnessPanelu</h5>
                    <button className={classes.ProgressModalBtn} onClick={this.showProgressModal}><i class="fas fa-table"></i></button>
            </Header>
                <ProgressModal show={this.state.showProgressModal} modalClosed={this.showProgressModal}/>
                <CaloriesSummary/>
                <PDF/>
                <Macronutrients/>
                <Recipes/>
                <RecipesLikeBox/>
                <WeightProgress currentWeight={this.state.currentWeight}/>
                <StartWeight/>
                <BMI showTable={this.state.showTable} showTableFn={this.showTable} BMI={this.state.BMI}/>
                
                <div className={classesBox.DetailBox}>
                    <p>Aktualna waga</p>
                    <span>{this.state.newUserWeight}<span style={{fontSize: '16px'}}> KG</span></span>
                    {this.state.showWeightInput ? null : <button onClick={this.showWeightBtn}>Aktualizuj</button>}
                    {this.state.showWeightInput ? <Aux>
                <button  style={{marginBottom: '1px'}} onClick={this.updateUser}>Aktualizuj</button>
                <DebounceInput
                    type="number"
                    min={1}
                    max={999}
                    debounceTimeout={300}
                    onChange={this.updateUserWeight}
                    placeholder="KG"
                        /></Aux> : null }
                </div>
        </Aux>
        )
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
                {this.state.spinnerLoader ? <Spinner/> : null}
            </PanelWrapper>
        </Aux>
        )
    }
}
