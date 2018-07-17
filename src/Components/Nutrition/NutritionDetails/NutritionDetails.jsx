import axios from 'axios';
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import FirebaseConfig from '../../../Config/FirebaseConfig';
import PanelWrapper from '../../../UI/PanelWrapper/PanelWrapper';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './NutritionDetails.css'

export default class NutritionDetails extends Component {
    state = {
        chartData: {
            labels: ['Białko(g)', 'Tłuszcze(g)', 'Węglowodany(g)', 'Kalorie(kcal)'],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.25)',
                        'rgba(76, 175, 80, 0.55)',
                        'rgba(76, 175, 80, 0.75)',
                        'rgba(76, 175, 80, 0.95)'
                    ]
                }
            ]
        },
        allMicronutrients: [],
        isLoading: false,
        currentUserIdFB: FirebaseConfig.auth().currentUser.uid
    }

    componentDidMount() {
        const MicronutrientsUpdate = [];

        axios.get(`https://fitnesspanel-eb7a2.firebaseio.com/${this.state.currentUserIdFB}/meals.json`)
            .then(response => {
                let Micronutrients = response.data;
                for (let key in Micronutrients) {
                    MicronutrientsUpdate.push({
                        calories: parseFloat(Micronutrients[key].calories),
                        protein: parseFloat(Micronutrients[key].macronutrients.protein),
                        carbohydrates: parseFloat(Micronutrients[key].macronutrients.carbohydrates),
                        fat: parseFloat(Micronutrients[key].macronutrients.fat)
                    })
                    this.setState({ allMicronutrients: MicronutrientsUpdate })
                }
            })
            .then(() => {

                const Micronutrients = [...this.state.allMicronutrients];
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
                // let DETAILS =[summaryFat, summaryCarbohydrates, summaryProtein];
                // this.state.chartData.datasets[0].data[0] = summaryProtein;
                // this.state.chartData.datasets[0].data[1] = summaryFat;
                // this.state.chartData.datasets[0].data[2] = summaryCarbohydrates;

                const chartData = this.state.chartData;
                chartData.datasets[0].data[0] = summaryProtein;
                chartData.datasets[0].data[1] = summaryFat;
                chartData.datasets[0].data[2] = summaryCarbohydrates;
                chartData.datasets[0].data[3] = summaryCalories;

                // this.setState({calories: summaryCalories})
                this.setState({ chartData: chartData })
            })
            .then(() => this.setState({ isLoading: true }))
            .catch(error => console.log(error))
    }

    render() {
        let showChart = <Spinner />
        if (this.state.isLoading) {
            showChart = <Doughnut
                data={this.state.chartData}
                width={350}
                height={350}
                options={{
                    maintainAspectRatio: false
                }}
            />
        }
        return (
            <PanelWrapper>
                <p className={classes.NutritionDetailsInfo} >
                    Kontrolowanie swoich makroskładników w diecie jest bardzo ważne, to dzięki nim wiemy jak wygląda nasz bilans kaloryczny.
                    Rozkład Twoich makroskładników przedstawiony jest na poniższym wykresie:
                </p>
                <div style={{ height: '350px', width: '350px', margin: '0 auto' }}>
                    {showChart}
                </div>
            </PanelWrapper>
        )
    }
}
