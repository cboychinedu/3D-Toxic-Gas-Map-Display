// Importing the necessary modules 
import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';

// Creating the App component 
class App extends Component {
  // Setting the state 
  state = {} 

  // Rendering the component 
  render() {
    // Returning the component 
    return (
      <Fragment> 
          <BrowserRouter> 
            {/* Setting the Routes configurations */}
            <Routes>
                <Route exact path="/" element={<Home /> } /> 
            </Routes>
          </BrowserRouter>
      </Fragment>
    )
  }
}

// Exporting the App component 
export default App;
