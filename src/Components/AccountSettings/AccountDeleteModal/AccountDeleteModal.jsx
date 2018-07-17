import React, { Component } from 'react'
import classes from './AccountDeleteModal.css'
import FirebaseConfig from '../../../Config/FirebaseConfig'

export default class AccountDeleteModal extends Component {
  
  logOut = () =>{
    FirebaseConfig.auth().signOut();
    window.location.replace('/register')
  }

  render() {
    return (
      <div className={classes.AccountDeleteModal}>
        <p>{this.props.errorDeleteAccount}</p>
        {this.props.errorDelete ? <button onClick={this.logOut}>Zaloguj się</button> : <button onClick={this.props.deleteAccount}>Tak, usuń konto.</button>}
      </div>
    )
  }
}
