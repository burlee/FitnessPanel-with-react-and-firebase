import axios from 'axios';
import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Aux from '../../HOC/aux_x';
//SVG icons
import ActivityIcon from '../../ASSETS/activity_icon.svg';
import NutritionIcon from '../../ASSETS/apple_icon.svg';
import HeartIcon from '../../ASSETS/heart_icon.svg';
import ProfilIcon from '../../ASSETS/profil_icon.svg';
import SettingsIcon from '../../ASSETS/settings_icon.svg';
//Application components
import AccountSettings from '../AccountSettings/AccountSettings';
import ActivityDetails from '../ActivityDetails/ActivityDetails';
import Login from '../Authentication/Login/Login';
import Register from '../Authentication/Register';
import Excercise from '../Excercise/Excercise';
import NutritionPanel from '../Nutrition/NutritionPanel/NutritionPanel';
import CompletePanel from '../Start/CompletePanel/CompletePanel';
import StartPanel from '../Start/StartPanel/StartPanel';
import classes from './Navbar.css';
// FIREBASE CONFIGURATION
import FirebaseConfig from '../../Config/FirebaseConfig';
import asyncComponent from '../../HOC/asyncComponent';

//HOC async CHUNK
const asyncNutritionDetails = asyncComponent(() => {
  return import('../Nutrition/NutritionDetails/NutritionDetails');
})

export default class Navbar extends Component {
  state = {
    userIsLoggin: false,
    userExist: false,
    leftPosition: 0,
    showCounter: -100,
    currentUserIdFB: null
  }

  componentDidMount() {
    this.userIsLoggin();
  }

  userIsLoggin = () => {
    FirebaseConfig.auth().onAuthStateChanged(user => {
      if (user) {
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/user.json`)
          .then(response => {
            if (response.data !== null) {
              this.setState({ userExist: true });
            }
          })
        this.setState({ userIsLoggin: true });
      } else{ this.setState({ userIsLoggin: false }) };
    });
  }

  logOutUser = () => {
    FirebaseConfig.auth().signOut();
    window.location.replace('/login');
  }

  hideMenu = () => {
    this.setState({ leftPosition: this.state.leftPosition === -90 ? 0 : -90 });
  }

  render() {
    return (
      <Aux>
        {this.state.userIsLoggin ?
          <header onDoubleClick={this.hideMenu} style={{ left: this.state.leftPosition + 'px' }} className={classes.NavHeader}>
            <nav>
              <button onClick={this.logOutUser} className={classes.LogoutBtn}>Wyloguj</button>
              <div className={classes.Logo}></div>
              <ul>
                <li><NavLink to="/"><img src={ProfilIcon} alt="Profil" /></NavLink></li>
                <li><NavLink to="/nutrition"><img src={NutritionIcon} alt="Odżywanie" /></NavLink></li>
                <li><NavLink to="/excercise"><img src={HeartIcon} alt="Ćwiczenia" /></NavLink></li>
                <li><NavLink to="/activityDetails"><img src={ActivityIcon} alt="Aktywność użytkownika" /></NavLink></li>
                <li><NavLink to="/account"><img src={SettingsIcon} alt="Ustawienia" /></NavLink></li>
              </ul>
            </nav>
          </header> : null}
        
        {this.state.userIsLoggin ? null : 
          <Switch>
            <Route path='/register' exact component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        }

        {this.state.userIsLoggin ?
          <Switch>
            <Route path='/' exact component={CompletePanel} />
            <Route path='/nutrition' component={NutritionPanel} />
            <Route path='/nutrition-details' component={asyncNutritionDetails} />
            <Route path='/excercise' component={Excercise} />
            <Route path='/activityDetails' component={ActivityDetails} />
              {this.state.userExist ? null : <Route path='/profil' component={StartPanel} />}
            <Route path='/account' component={AccountSettings} />
          </Switch> : null}
      </Aux>
    )
  }
}
