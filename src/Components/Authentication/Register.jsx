import React, { Component } from 'react'
import axios from 'axios'
import classes from './Register.css'
import ErrorComponent from '../../UI/ErrorComponent/ErrorComponent'
import SwitchButton from '../../UI/SwitchButton/SwitchButton';

export default class Auth extends Component {
    state = {
        userDetails: {
            email: '',
            password: '',
            returnSecureToken: true
        },
        error: false,
        successRegister: false
    }

    emailValue = (event) => {
        const emailValue = event.target.value;
        const userDetails = this.state.userDetails;
        userDetails.email = emailValue;
        this.setState({ userDetails: userDetails })
    }

    passwordValue = (event) => {
        const userDetails = this.state.userDetails;
        const passwordValue = event.target.value;
        userDetails.password = passwordValue;
        this.setState({ userDetails: userDetails })
    }

    getUserDetails = (event) => {
        event.preventDefault();
        const authData = { ...this.state.userDetails }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB17NW3wAmHjH0e61W6J9ctckblOy4W3JQ', authData)
            .then(response => {
                this.setState({ successRegister: true })
            })
            .catch(error => {
                console.log(error.data)
                this.setState({ error: true })
            })
    }

    removeError = () => {
        setTimeout(() => this.setState({ error: false }), 6000)
    }

    render() {
        return (
            <div className={classes.FormStyle}>
                <SwitchButton link="/login">Zaloguj się</SwitchButton>
                <header className={classes.RegisterHeader}>Zarejestruj się</header>
                <form onSubmit={this.getUserDetails}>
                    <label htmlFor="email">Podaj adres e-mail:</label>
                    <input onChange={this.emailValue} type="email" id="email" autoComplete="off" />
                    <label htmlFor="password">Hasło:</label>
                    <input onChange={this.passwordValue} type="password" id="password" />
                    <button onClick={this.removeError}>Zarejestruj</button>
                    {this.state.successRegister ? this.props.history.push('/login') : null}
                    {this.state.error ? <ErrorComponent /> : null}
                </form>
            </div>
        )
    }
}
