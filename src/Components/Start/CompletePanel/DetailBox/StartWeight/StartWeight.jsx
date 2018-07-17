import classes from '../../DetailBox/DetailBox.css'
import React, { Component } from 'react'
import FirebaseConfig from '../../../../../Config/FirebaseConfig'
import axios from 'axios'

export default class Weight extends Component {
    state = {
        startWeight: null
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
    }

    render() {
        return (
            <div className={classes.DetailBox}>
                <p>Początkowa waga</p>
                <span>{this.state.startWeight}</span> 
                <p>KG</p>             
            </div>
        )
    }
}
