import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends React.Component {
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
    console.log('CHAMOU VERIFY')
    const url = 'http://localhost:3001/register';
    try {
      const data = await axios.post(url, { username, password });
      console.log('teste: ', data.data);
      if (data.response.data.message === 'Usuário criado com sucesso.') {
        window.location.assign('http://localhost:3000/login');
      } else {
        this.setState({ errorMessage: data.response.data.message });
      }
    } catch (e) {
      console.log('teste: ', e.response);
      this.setState({ errorMessage: e.response.data.message });
    }
  }

  render() {
    const { username, password, btnDisable, errorMessage } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <p>Lexart Labs - Processo Seletivo</p>
        <form>
          <p>Usuário</p>
          <label htmlFor='username'>
            <input
              type='text'
              id='username'
              value= { username }
              onChange={ (e) => this.typeEvent(e) }
            />
          </label>
          <p>Senha</p>
          <label htmlFor='password'>
            <input
              type='password'
              id='password'
              value={ password }
              onChange={ (e) => this.typeEvent(e) }
            />
          </label>
          <br />
          <button
            type='button'
            disabled={ btnDisable }
            onClick={ this.verifyUser }
          >
            Registrar
          </button>
          <p>
            Já possui uma conta? 
            <Link to='/'>
              Entre
            </Link>
          </p>
          {
            errorMessage
            ? (
              <p>
                { errorMessage }
              </p>
            ) : ''
          }
        </form>
      </div>
    )
  }
}

export default Register