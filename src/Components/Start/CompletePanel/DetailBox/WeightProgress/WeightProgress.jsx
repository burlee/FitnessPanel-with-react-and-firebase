import classes from '../../DetailBox/DetailBox.css'
import React, { PureComponent } from 'react'
import FirebaseConfig from '../../../../../Config/FirebaseConfig'
import axios from 'axios'
import Aux from '../../../../../HOC/aux_x';

export default class Weight extends PureComponent {
    state = {
        startWeight: null,
        currentWeight: this.props.currentWeight,
        finishWeight: null,
        negativeWeight: false
    }
    
    componentDidMount(){
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/user.json`)
        .then(response => {
            for(let key in response.data){
                this.setState({
                    startWeight: response.data[key].weight
                })
            }
        })
        .then(()=>{
            const finishWeight = this.state.startWeight - this.state.currentWeight;
            if(finishWeight < 0){
                let finishWeightABS = Math.abs(finishWeight)
                this.setState({
                    finishWeight: finishWeightABS,
                    negativeWeight: true
                })
            }else{
                this.setState({finishWeight})
            }
        })
    }
    
    render() {
        let displayWeight = (
        <Aux>
            <p>Schudłeś</p>
            <span>{this.state.finishWeight}</span> 
            <p>KG</p>
        </Aux>)
        if(this.state.negativeWeight){
            displayWeight = (
                <Aux>
                    <p>Przytyłeś</p>
                    <span>{this.state.finishWeight}</span> 
                    <p>KG</p>
                </Aux>)
        }

        return (
            <div className={classes.DetailBox}>
                {displayWeight}             
            </div>
        )
    }
}
