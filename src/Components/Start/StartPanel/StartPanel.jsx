import React, { PureComponent } from 'react';
import Aux from '../../../HOC/aux_x'
import PanelWrapper from '../../../UI/PanelWrapper/PanelWrapper';
import StartForm from '../StartForm/StartForm';
import WelcomePanel from '../WelcomePanel/WelcomePanel';
import axios from 'axios'
import FirebaseConfig from '../../../Config/FirebaseConfig'

export default class StartPanel extends PureComponent {
    state = {
        showForm: false
    }

    completeProfilHandler = () => {
        let show = !this.state.show;
        this.setState({ show: show })
    }

    backStartPanel = () => {
        this.setState({ show: false })
    }

    getPersonDetails = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const age = event.target.elements.age.value;
        const height = event.target.elements.height.value;
        const weight = event.target.elements.weight.value;
        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}weight`, weight);
        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}height`, height);
        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}name`, name);
        localStorage.setItem(`${FirebaseConfig.auth().currentUser.uid}BMI`, (weight / (height * height) * 10000).toFixed(2));
        const user = {
            name: name,
            age: age,
            height: height,
            weight: weight,
            BMI: (weight / (height * height) * 10000).toFixed(2)
        }
        const userWeight = {
            weight: weight
        }
        axios.post(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userWeight.json`, userWeight)

        axios.post(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/user.json`, user)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.props.history.push('/')
                }
            })
    }

    render() {
        let welcome = <WelcomePanel show={this.state.show} clicked={this.completeProfilHandler} />;
        if (this.state.show) {
            welcome = (
                <Aux>
                    <StartForm getPersonDetails={this.getPersonDetails} />
                    <button style={{
                        background: 'none',
                        border: 'none',
                        padding: '10px',
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        outline: 'none',
                        fontWeight: 'bold',
                        color: 'gray'
                    }}
                        onClick={this.backStartPanel}>Wróć</button>
                </Aux>
            )
        }
        return (
            <PanelWrapper>
                {welcome}
            </PanelWrapper>
        )
    }
}
