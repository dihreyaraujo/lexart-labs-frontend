import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Phones from './pages/Phones';
import PhoneId from './pages/PhoneId';
import AddPhone from './pages/AddPhone';

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route exact path="/products" element={ <Phones /> } />
          <Route path="/products/:id" element={ <PhoneId /> } />
          <Route path="/product/add" element={ <AddPhone /> } />
        </Routes>
      </div>
    )
  }
}

export default App;
