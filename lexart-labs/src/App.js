import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </div>
    )
  }
}

export default App;
