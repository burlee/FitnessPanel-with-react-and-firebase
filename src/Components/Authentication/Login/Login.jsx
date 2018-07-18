import React, { Component } from 'react'
import classes from './Login.css'
import FirebaseConfig from '../../../Config/FirebaseConfig'
import ErrorComponent from '../../../UI/ErrorComponent/ErrorComponent';
import SwitchButton from '../../../UI/SwitchButton/SwitchButton';
import { DebounceInput } from 'react-debounce-input';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        error: false
    }

    logginUser = (event) => {
        event.preventDefault();
        FirebaseConfig.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/');
                }
            )
            .catch((() => {
                this.setState({ error: true })
                console.log('Błąd logowania...')
            }));
    }

    removeError = () => {
        setTimeout(() => this.setState({ error: false }), 6000)
    }

    render() {
        return (

            <div className={classes.FormStyle}>
                <SwitchButton link="/register">Wróć do rejestracji</SwitchButton>
                <header className={classes.LoginHeader}>Zaloguj się</header>
                <form onSubmit={this.logginUser}>
                    <label htmlFor="email">Podaj adres e-mail:</label>
                    <DebounceInput
                        id="email"
                        autoComplete="off"
                        minLength={2}
                        debounceTimeout={250}
                        onChange={event => this.setState({ email: event.target.value })} />
                    <label htmlFor="password">Hasło:</label>
                    <DebounceInput
                        type="password"
                        id="password"
                        minLength={2}
                        debounceTimeout={250}
                        onChange={event => this.setState({ password: event.target.value })} />
                    <button onClick={this.removeError}>Zaloguj</button>
                </form>
                {this.state.error ? <ErrorComponent /> : null}
            </div>
        )
    }
}
