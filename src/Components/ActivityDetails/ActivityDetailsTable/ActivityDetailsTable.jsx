import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React, { Component } from 'react';
import FirebaseConfig from '../../../Config/FirebaseConfig';
import Aux from '../../../HOC/aux_x';
import classes from './ActivityDetailsTable.css';
import { DebounceInput } from 'react-debounce-input';

export default class ActivityDetailsTable extends Component {
    state = {
        currentUserIdFB: FirebaseConfig.auth().currentUser.uid,
        userDetails: [],
        summaryFat: null,
        summaryCarbohydrates: '',
        summaryProtein: null,
        summaryCalories: null,
        search: '',
        time: ''
    }
    componentDidMount() {
        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${this.state.currentUserIdFB}/meals.json`)
            .then(response => {
                const userDetails = [];
                for (let key in response.data) {
                    userDetails.push({
                        id: this.state.userDetails.length + 1,
                        date: response.data[key].date,
                        name: response.data[key].name,
                        calories: parseFloat(response.data[key].calories),
                        protein: parseFloat(response.data[key].macronutrients.protein),
                        fat: parseFloat(response.data[key].macronutrients.fat),
                        carbohydrates: parseFloat(response.data[key].macronutrients.carbohydrates),
                        time: response.data[key].time
                    })
                    this.setState({ userDetails })
                }
            })
            .then(() => {
                const Micronutrients = [...this.state.userDetails];
                let summaryCalories = 0;
                let summaryFat = 0;
                let summaryCarbohydrates = 0;
                let summaryProtein = 0;

                for (let i = 0; i < Micronutrients.length; i++) {
                    summaryCalories += Micronutrients[i].calories;
                    summaryFat += Micronutrients[i].fat;
                    summaryCarbohydrates += Micronutrients[i].carbohydrates;
                    summaryProtein += Micronutrients[i].protein;
                }
                this.setState({
                    summaryCalories,
                    summaryFat,
                    summaryCarbohydrates,
                    summaryProtein
                })
            })
            .catch(error => console.log(error))
    }

    exportPDF = () => {
        const data = new Date();
        const year = data.getFullYear();
        const month = data.getMonth() + 1;
        const day = data.getDate();
        let fullDate = `${day}/${month}/${year}`;

        let userDetailsPDF = this.state.userDetails.map(userDetails => {
            return [
                userDetails.id,
                userDetails.name,
                'Kalorie: ' + userDetails.calories,
                'Białko: ' + userDetails.protein,
                'Węglowodany: ' + userDetails.carbohydrates,
                'Tłuszcze: ' + userDetails.fat,
                userDetails.date,
                'Godzina: ' + userDetails.time
            ];
        });

        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        var docDefinition = {
            content: [
                {
                    color: '#000000',
                    fontSize: 10,
                    table: {
                        headerRows: 1,
                        body: [
                            [{ text: `Lista spożytych produktów:`, style: 'tableHeader' }]
                        ]
                    },
                    layout: 'noBorders'
                },
                {
                    color: '#4c4c4c',
                    fontSize: 11,
                    table: {
                        body: userDetailsPDF
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? '#808080' : null;
                        }
                    }
                },
                {
                    color: '#000000',
                    fontSize: 10,
                    table: {
                        headerRows: 1,
                        body: [
                            [{ text: `Podsumowanie do dnia ${fullDate}:`, style: 'tableHeader' }],
                            [`Kalorie: ${this.state.summaryCalories}(kcal)`],
                            [`Białko: ${this.state.summaryProtein}(g)`],
                            [`Węglowodany: ${this.state.summaryCarbohydrates}(g)`],
                            [`Tłuszcze: ${this.state.summaryFat}(g)`]
                        ]
                    },
                    layout: 'noBorders'
                }
            ]
        };
        pdfMake.createPdf(docDefinition).download(`Raport do dnia ${fullDate}`);
    }

    render() {
        let userDetails = this.state.userDetails;

        if (userDetails.length !== 0) {
            userDetails = userDetails
                .filter(meal => {
                    return meal.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                })
                .map(userDetails => {
                    return (
                        <tr key={userDetails.id}>
                            <td>{userDetails.id}</td>
                            <td>{userDetails.name}</td>
                            <td>{userDetails.calories}</td>
                            <td>{userDetails.protein}</td>
                            <td>{userDetails.carbohydrates}</td>
                            <td>{userDetails.fat}</td>
                            <td>{userDetails.date}</td>
                        </tr>
                    )
                });
        }

        if (userDetails.length === 0) {
            userDetails =
                <tr>
                    <td>Brak.</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
        }

        let table = null;
        if (this.state.userDetails.length) {
            table = (<Aux>
                <DebounceInput
                    className={classes.searchMeal}
                    minLength={1}
                    debounceTimeout={300}
                    placeholder="Wyszukaj posiłku..."
                    onChange={(event)=>this.setState({search: event.target.value})}
                />
                <table className={classes.table}>
                    <tbody>
                        <tr>
                            <th style={{ borderTopLeftRadius: '3px' }}>NR</th>
                            <th>Nazwa posiłku</th>
                            <th>Kalorie (kcal)</th>
                            <th>Białko (g)</th>
                            <th>Węglowodany (g)</th>
                            <th>Tłuscze (g)</th>
                            <th style={{ borderTopRightRadius: '3px' }}>Data</th>
                        </tr>
                        {userDetails}
                        <tr>
                            <th style={{ borderBottomLeftRadius: '3px' }}>Suma:</th>
                            <th></th>
                            <th>{this.state.summaryCalories}</th>
                            <th>{this.state.summaryProtein}</th>
                            <th>{this.state.summaryCarbohydrates}</th>
                            <th>{this.state.summaryFat}</th>
                            <th><button className={classes.getRaportBtn} onClick={this.exportPDF}>Pobierz raport</button></th>
                        </tr>
                    </tbody>
                </table>
                <p className={classes.ActivityDetailsParagraph}><span style={{ cursor: 'pointer' }} onClick={this.exportPDF}><b>Pobierz</b></span> raport z diety, którą prowadzisz.</p>
            </Aux>)
        }

        return (
            <Aux>
                {table}
            </Aux>
        )
    }
}
