import classes from './WarningModal.css';
import React, { Component } from 'react';
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import Aux from '../../../../HOC/aux_x';

export default class WarningModal extends Component {
    acceptInformation = () => {
        window.location.reload();
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.WarningModal}/>
                <div className={classes.WarningModal}>
                    <p>Ten produkt został niedawno dodany.<br/>Zastanów się czy chcesz go od razu usunąć.</p>
                    <button onClick={this.acceptInformation}>Dalej</button>
                </div>
            </Aux>
        )
    }
}
