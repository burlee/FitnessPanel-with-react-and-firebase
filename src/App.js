import React, { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Aux from './HOC/aux_x';
import {BrowserRouter} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Aux>
        <BrowserRouter>
          <Navbar/>
        </BrowserRouter>
      </Aux>
    );
  }
}

export default App;
