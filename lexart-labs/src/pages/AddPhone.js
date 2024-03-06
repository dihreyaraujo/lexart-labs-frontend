import axios from "axios";
import React from "react";
import Header from "../components/Header";

class AddPhone extends React.Component {
  state = {
    product: {
      'name': '',
      'brand': '',
      'model': '',
      'color': '',
      'price': '',
    },
    errorMsg: ''
  }

  async componentDidMount() {
    await this.verifyLogged()
  }

  verifyLogged = async () => {
    try {
      const url = 'https://lexart-labs-backend-sooty.vercel.app/products';
      const token = JSON.parse(localStorage.getItem('tokenLexart'));
      await axios.get(url, {
        headers: {
          "Authorization": token
        }
      });
    } catch (e) {
      this.setState({ errorMsg: e.response.data.message });
    }
  }

  typeEvent = (event) => {
    const { target } = event;
    this.setState(prevState => ({
      product: {
        ...prevState.product,
        [target.id]: target.value
      }
    }));
  };

  updateProduct = async () => {
    const { product } = this.state;
    const url = 'https://lexart-labs-backend-sooty.vercel.app/products';
    const token = JSON.parse(localStorage.getItem('tokenLexart'));
    try {
      const response = await axios.post(url, product, {
        headers: {
          Authorization: token,
          "Content-Type": 'application/json'
        }
      });
      if (response.data.message === 'Produto cadastrado com sucesso') {
        window.location.assign('https://lexart-labs-frontend.vercel.app/products');
      } else {
        this.setState({ errorMsg: response.data.message })
      }
    } catch (e) {
      this.setState({ errorMsg: e.response.data.message })
    }
  }

  transformProd = () => {
    const { product } = this.state;
    const prodInHtml = (
      <div className='form-update'>
        <div className='inputs-form'>
          <p>Nome: </p>
          <input type='text' value={product.name} id={"name"} onChange={(e) => this.typeEvent(e)} />
        </div>
        <div className='inputs-form'>
          <p>Marca: </p>
          <input type='text' value={product.brand} id={"brand"} onChange={(e) => this.typeEvent(e)} />
        </div>
        <div className='inputs-form'>
          <p>Modelo: </p>
          <input type='text' value={ product.model } id={ "model" } onChange={(e) => this.typeEvent(e)} />
        </div>
        <div className='inputs-form'>
          <p>Cor: </p>
          <input type='text' value={ product.color } id={ "color" } onChange={(e) => this.typeEvent(e)} />
        </div>
        <div className='inputs-form'>
          <p>Preço: </p>
          <input type='text' value={ product.price } id={ "price" } onChange={(e) => this.typeEvent(e)} />
        </div>
        <button type='button' className='att-button' onClick={ async () => await this.updateProduct() }>Adicionar</button>
      </div>
    );
    return prodInHtml;
  };

  render() {
    const { errorMsg } = this.state;
    return (
      <div>
        <Header />
        <div>
          { errorMsg ? <p>{ errorMsg }</p> : this.transformProd()}
        </div>
      </div>
    );
  }
}

export default AddPhone;
