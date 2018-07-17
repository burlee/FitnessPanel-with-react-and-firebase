import React, { Component } from 'react';
import PanelWrapper from '../../UI/PanelWrapper/PanelWrapper';
import ExerciseOne from './ExerciseOne/ExerciseOne';
import ExerciseTwo from './ExerciseTwo/ExerciseTwo';
import ExerciseThree from './ExerciseThree/ExerciseThree';
import Header from '../../UI/Header/Header'


export default class Excercise extends Component {
    state = {
        excerciseOneDone: false,
        excerciseTwoDone: false,
        excerciseThreeDone: false
    }
    excerciseOneDoneFn = () => {
        const excerciseOneDone = !this.state.excerciseOneDone;
        this.setState({ excerciseOneDone: excerciseOneDone })
        localStorage.setItem('exerciseOne', '1');
        if (this.state.excerciseOneDone) {
            localStorage.removeItem('exerciseOne')
        }
    }
    excerciseTwoDoneFn = () => {
        const excerciseTwoDone = !this.state.excerciseTwoDone;
        this.setState({ excerciseTwoDone: excerciseTwoDone })
        localStorage.setItem('exerciseTwo', '2');
        if (this.state.excerciseTwoDone) {
            localStorage.removeItem('exerciseTwo')
        }
    }
    excerciseThreeDoneFn = () => {
        const excerciseThreeDone = !this.state.excerciseThreeDone;
        this.setState({ excerciseThreeDone: excerciseThreeDone })
        localStorage.setItem('exerciseThree', '3');
        if (this.state.excerciseThreeDone) {
            localStorage.removeItem('exerciseThree')
        }
    }
    
    render() {
        return (
            <PanelWrapper wrapperType='DisplayFlex'>
                <Header><p>Kluczem do wymarzonej sylwetki są dieta i regularne ćwiczenia.Wykonuj ten zestaw ćwiczeń każdego dnia</p></Header>
                <ExerciseOne
                    excerciseOneDone={this.state.excerciseOneDone}
                    excerciseOneDoneFn={this.excerciseOneDoneFn}
                />
                <ExerciseTwo
                    excerciseTwoDone={this.state.excerciseTwoDone}
                    excerciseTwoDoneFn={this.excerciseTwoDoneFn}
                />
                <ExerciseThree
                    excerciseThreeDone={this.state.excerciseThreeDone}
                    excerciseThreeDoneFn={this.excerciseThreeDoneFn}
                />
            </PanelWrapper>
        )
    }
}
