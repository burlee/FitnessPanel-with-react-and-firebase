import classes from '../../DetailBox/DetailBox.css'
import React, { Component } from 'react'
import FirebaseConfig from '../../../../../Config/FirebaseConfig'
import axios from 'axios'
import { DebounceInput } from 'react-debounce-input'
import Aux from '../../../../../HOC/aux_x';

class Weight extends Component {
    state = {
        showWeightInput: false,
        weightValue: null,
        weight: localStorage.getItem(`${FirebaseConfig.auth().currentUser.uid}weight`)
    }

    showWeightBtn = () => {
        const showWeightInput = !this.state.showWeightInput;
        this.setState({showWeightInput})
    }

    updateWeight = () => {
        const userWeight = {
            weight: this.state.weightValue
        };

        let userHeight = this.props.userHeight;

        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}weight`, this.state.weightValue);
        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}BMI`, (userWeight.weight / (userHeight * userHeight) * 10000).toFixed(2));

        axios.put(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userWeight.json`, userWeight)
        
        this.setState({weight: this.state.weightValue, showWeightInput: false})
        
        // window.location.reload();
    }

    render() {
        return (
            <div className={classes.DetailBox}>
                <p>Aktualna waga</p>
                <span>{this.state.weight}<span style={{fontSize: '16px'}}> KG</span></span>
                {this.state.showWeightInput ? null : <button onClick={this.showWeightBtn}>Zmień wagę</button>}
                {this.state.showWeightInput ? <Aux>
                <button  style={{marginBottom: '1px'}} onClick={this.updateWeight}>Aktualizuj</button>
                <DebounceInput
                    type="number"
                    min={1}
                    max={999}
                    onChange={event => this.setState({weightValue: event.target.value.slice(0,3)})}
                    placeholder="KG"
                    className="user-name" /></Aux> : null }
            </div>
        )
    }
}
export default Weight;