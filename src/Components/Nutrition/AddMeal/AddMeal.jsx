import React, { Component } from 'react'
import classes from './AddMeal.css'
import AddMealModal from './AddMealModal/AddMealModal';
import Aux from '../../../HOC/aux_x'
import Backdrop from '../../../UI/Backdrop/Backdrop';

export default class AddMeal extends Component {
    state = {
        show: true,
        showMealModal: false
    }

    closeMealModal = () => {
        this.setState({ show: false, showMealModal: false })
    }

    showMealModal = () => {
        this.setState({ showMealModal: true, show: true })
    }
    
    render() {

        let modalOpen = null;
        if (this.state.showMealModal) {
            modalOpen = (
                <div>
                    <AddMealModal />
                    <Backdrop show={this.state.show} modalClosed={this.closeMealModal} />
                </div>
            )
        }

        return (
            <Aux>
                <button onClick={this.showMealModal} className={classes.AddMeal}>+</button>
                {modalOpen}
            </Aux>
        )
    }
}
