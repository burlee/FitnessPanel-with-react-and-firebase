import React, { PureComponent } from 'react'
import classes from './ProgressModal.css'
import axios from 'axios'
import FirebaseConfig from '../../../Config/FirebaseConfig'
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/aux_x';


export default class ProgressModal extends PureComponent {
    state = {
        updateData: false,
        userBicepDimensions: '',
        oldUserBicepDimensions: '',
        userChestDimensions: '',
        oldUserChestDimensions: '',
        userThighDimensions: '',
        oldUserThighDimensions: ''
    }

    componentDidMount() {
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userBicep.json`)
            .then(response => { this.setState({ oldUserBicepDimensions: response.data.userBicep }) })
            .catch(error => this.setState({ oldUserBicepDimensions: '- ' }))
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userChest.json`)
            .then(response => { this.setState({ oldUserChestDimensions: response.data.userChest }) })
            .catch(error => this.setState({ oldUserChestDimensions: '- ' }))
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userThigh.json`)
            .then(response => { this.setState({ oldUserThighDimensions: response.data.userThigh }) })
            .catch(error => this.setState({ oldUserThighDimensions: '- ' }))
    }

    bicepDimensions = (event) => {
        const userBicep = event.target.value.slice(0, 2);
        this.setState({ userBicepDimensions: userBicep });
    }

    bicepDimensionsHandler = () => {
        const userBicepDimensions = {
            userBicep: this.state.userBicepDimensions
        }

        if (this.state.userBicepDimensions !== '') {
            axios.put(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userBicep.json`, userBicepDimensions)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ updateData: true })
                        setTimeout(() => this.setState({ updateData: false }), 3000)
                    }
                })
                .catch(error => error);
        }
    }

    chestDimensions = (event) => {
        const userChest = event.target.value.slice(0, 3);
        this.setState({ userChestDimensions: userChest });
    }

    chestDimensionsHandler = () => {
        const userChestDimensions = {
            userChest: this.state.userChestDimensions
        }

        if (this.state.userChestDimensions !== '') {
            axios.put(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userChest.json`, userChestDimensions)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ updateData: true })
                        setTimeout(() => this.setState({ updateData: false }), 3000)
                    }
                })
                .catch(error => error);
        }
    }

    thighDimensions = (event) => {
        const userThigh = event.target.value.slice(0, 3);
        this.setState({ userThighDimensions: userThigh });
    }

    thighDimensionsHandler = () => {
        const userThighDimensions = {
            userThigh: this.state.userThighDimensions
        }

        if (this.state.userThighDimensions !== '') {
            axios.put(`https://fitnesspanel-eb7a2.firebaseio.com/${FirebaseConfig.auth().currentUser.uid}/userThigh.json`, userThighDimensions)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ updateData: true })
                        setTimeout(() => this.setState({ updateData: false }), 3000)
                    }
                })
                .catch(error => error);
        }
    }

    render() {
        let showProgressModal = null;
        if(this.props.show){
            showProgressModal = (
                <Aux>
                    <Backdrop show={this.props.show} modalClosed={this.props.modalClosed}/>
                    <div className={classes.ProgressModal}>
                        <h1><i class="fas fa-table"></i> Tabela wymiarów</h1>
                        <div className={classes.DimensionsBox}>
                            <p>Podaj obwód bicepsu:</p>
                            <button onClick={this.bicepDimensionsHandler}>Zatwierdź</button>
                            <input type="number" onChange={this.bicepDimensions} />
                            <p>Poprzedni wymiar {this.state.oldUserBicepDimensions}cm</p>
                        </div>
                        <div className={classes.DimensionsBox}>
                            <p>Podaj obwód klatki piersiowej:</p>
                            <button onClick={this.chestDimensionsHandler}>Zatwierdź</button>
                            <input type="number" onChange={this.chestDimensions} />
                            <p>Poprzedni wymiar {this.state.oldUserChestDimensions}cm</p>
                        </div>
                        <div className={classes.DimensionsBox}>
                            <p>Podaj obwód uda:</p>
                            <button onClick={this.thighDimensionsHandler}>Zatwierdź</button>
                            <input type="number" onChange={this.thighDimensions} />
                            <p>Poprzedni wymiar {this.state.oldUserThighDimensions}cm</p>
                        </div>
                        <div className={classes.MessageBox}>
                            {this.state.updateData ? <span>Zaktualizowano</span> : null}
                        </div>
                    </div>
                </Aux>
            )
        }
        return (
            <Aux>
            {showProgressModal}
            </Aux>
        )
    }
}
