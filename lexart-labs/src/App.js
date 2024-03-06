import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Phones from './pages/Phones';

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/products" element={ <Phones /> } />
        </Routes>
      </div>
    )
  }
}

export default App;
