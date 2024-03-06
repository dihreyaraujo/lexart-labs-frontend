import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/Login.css'

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    btnDisable: true,
    errorMessage: '',
  }

  constructor() {
    super();
    const verifyLoginLogout = () => {
      const user = JSON.parse(localStorage.getItem('tokenLexart'));
      console.log(user);
      if (user) {
        window.location.assign('http://localhost:3000/products');
      }
    }
    verifyLoginLogout();
  }

  typeEvent = ({ target }) => {
    const inputEvent = target.id;
    this.setState({ [inputEvent]: target.value }, this.enableDisableButton);
  };

  enableDisableButton = () => {
    const { username, password } = this.state;
    if (username && password) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  verifyUser = async () => {
    const { username, password } = this.state;
    const url = 'http://localhost:3001/login'
    try {
      const data = await axios.post(url, { username, password });
      console.log(data.data);
      const token = data.data.token;
      localStorage.setItem('tokenLexart', JSON.stringify(token));
      window.location.assign('http://localhost:3000/products');
    } catch (e) {
      this.setState({ errorMessage: e.response.data.message });
      console.log(e.response);
    }
  }

  render() {
    const { username, password, btnDisable, errorMessage } = this.state;
    return (
      <div className='login-container'>
        <h1>Login</h1>
        <p>Lexart Labs - Processo Seletivo</p>
        <div className='form'>
          <p>Usuário:</p>
          <label htmlFor='username'>
            <input
              type='text'
              id='username'
              value= { username }
              onChange={ (e) => this.typeEvent(e) }
            />
          </label>
          <p>Senha:</p>
          <label htmlFor='password'>
            <input
              type='password'
              id='password'
              value={ password }
              onChange={ (e) => this.typeEvent(e) }
            />
          </label>
          <button
            type='button'
            disabled={ btnDisable }
            onClick={ this.verifyUser }
            className='enter'
          >
            Entrar
          </button>
          <p>
            Ainda não possui uma conta? 
          </p>
          <Link to='/register' className='register'>
              Registre-se
          </Link>
          {
            errorMessage
            ? (
              <p>
                { errorMessage }
              </p>
            ) : ''
          }
        </div>
      </div>
    )
  }
}

export default Login
