import axios from 'axios';
import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';

import FirebaseConfig from '../../Config/FirebaseConfig';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../../UI/Button/Button';
import PanelWrapper from '../../UI/PanelWrapper/PanelWrapper';
import AccountDeleteModal from './AccountDeleteModal/AccountDeleteModal';
import classes from './AccountSettings.css';

export default class AccountSettings extends Component {
    state = {
        deleteAccountModal: false,
        resetPassword: 'Wyślij link do zresetowania hasła.',
        addressEmail: '',
        changeAddressEmailCommunicate: 'Tutaj możesz zmienić swój adres e-mail.',
        errorDeleteAccount: 'Czy jesteś pewny swojej decyzji?',
        errorDelete: false
    }

    deleteAccount = () => {
        let user = FirebaseConfig.auth().currentUser;

        axios.delete(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}.json`)
            .then(response => {
                if (response.status === 200) {
                    //remove from localstorage
                    localStorage.removeItem(`${FirebaseConfig.auth().currentUser.uid}name`);
                    localStorage.removeItem(`${FirebaseConfig.auth().currentUser.uid}BMI`);
                    localStorage.removeItem(`${FirebaseConfig.auth().currentUser.uid}calory`);

                    user.delete().then(response => {
                        window.location.replace('/register')
                    })
                        .catch(() => this.setState({ errorDeleteAccount: 'Potwierdź swoją tożsamość i zaloguj się ponownie.', errorDelete: true }));
                }
            })
            .catch(error => console.log(error))
    }

    showdeleteAccountModal = () => {
        const deleteAccountModal = !this.state.deleteAccountModal;
        this.setState({ deleteAccountModal: deleteAccountModal });
    }

    resetPassword = () => {
        let auth = FirebaseConfig.auth();
        let emailAddress = FirebaseConfig.auth().currentUser.email;

        auth.sendPasswordResetEmail(emailAddress)
            .then(() => {
                this.setState({ resetPassword: `Link do zmiany hasła został wysłany na ${emailAddress}.` })
            })
            .catch(error => console.log(error))
    }

    changeAddressEmail = () => {
        let user = FirebaseConfig.auth().currentUser;

        user.updateEmail(this.state.addressEmail)
            .then(() => {
                this.setState({ changeAddressEmailCommunicate: `Twój adres e-mail został zmieniony na ${this.state.addressEmail}.` })
            })
            .catch(() => this.setState({ changeAddressEmailCommunicate: `Wpisany adres e-mail jest niepoprawny.` }))
    }

    render() {
        return (
            <PanelWrapper wrapperType='DisplayFlexAccountOptions'>
                <div className={classes.changePassword}>
                    <p>{this.state.resetPassword}</p>
                    <Button clicked={this.resetPassword}>Zresetuj hasło</Button>
                </div>
                <div className={classes.changeAddressEmail}>
                    <p>{this.state.changeAddressEmailCommunicate}</p>
                    <DebounceInput
                        minLength={4}
                        placeholder="Wpisz nowy adres e-mail..."
                        debounceTimeout={300}
                        type='email'
                        onChange={event => this.setState({ addressEmail: event.target.value })}
                    />
                    <Button clicked={this.changeAddressEmail}>Zmień adres e-mail</Button>
                </div>
                <div className={classes.accountDelete}>
                    <p>Jeśli chcesz usunąć konto, możesz to zrobić poniżej.</p>
                    <Button clicked={this.showdeleteAccountModal}>Usuń konto</Button>
                    <Backdrop show={this.state.deleteAccountModal} modalClosed={this.showdeleteAccountModal} />
                    {this.state.deleteAccountModal ? <AccountDeleteModal errorDelete={this.state.errorDelete} errorDeleteAccount={this.state.errorDeleteAccount} deleteAccount={this.deleteAccount} /> : null}
                </div>
            </PanelWrapper>
        )
    }
}
