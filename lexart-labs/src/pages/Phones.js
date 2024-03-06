import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Phones extends React.Component {
  state = {
    products: [],
    errorMsg: '',
    searchProducts: '',
    filterProducts: [],
    filterBrands: []
  }

  async componentDidMount() {
    await this.verifyLogged()
  }

  verifyLogged = async () => {
    try {
      const url = 'http://localhost:3001/products';
      const token = JSON.parse(localStorage.getItem('tokenLexart'));
      const user = await axios.get(url, {
        headers: {
          "Authorization": token
        }
      });
      if (user) {
        this.setState({ products: user.data });
      }
    } catch (e) {
      this.setState({ errorMsg: e.response.data.message });
    }
  }

  deleteProd = async ({ target }) => {
    try {
      const url = 'http://localhost:3001/productsDelete';
      const token = JSON.parse(localStorage.getItem('tokenLexart'));
      const user = await axios.post(url, { id: target.id } ,{
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      });
      if (user.data.message === 'Produto excluído com sucesso') {
        window.location.reload()
      }
    } catch (e) {
      this.setState({ errorMsg: e.response.data.message });
    }
  }

  transformProd = (prod) => {
    const prodInHtml = prod.map((elem) => (
      <div>
        <h2>Nome: { elem.name }</h2>
        <p>Marca: { elem.brand }</p>
        <p>Modelo: { elem.model }</p>
        <p>Cor: { elem.color }</p>
        <p>Preço: R${ elem.price },00</p>
        <Link to={`/products/${elem.id}`}>
          <button type='button'>Editar</button>
        </Link>
        <button id={ elem.id } onClick={ async (e) => await this.deleteProd(e) }>Apagar</button>
      </div>
    ));
    return prodInHtml
  }

  typeEvent = ({ target }) => {
    const inputEvent = target.id;
    const { products } = this.state;
    const filterProd = products.filter((elem) => elem.name.toLowerCase().includes(target.value.toLowerCase()))
    this.setState({ [inputEvent]: target.value, filterProducts: filterProd });
  };

  filterBrand = ({ target }) => {
    const { id } = target;
    if (id === 'todos') {
      this.setState({ filterBrands: [] })
    } else {
      const { products } = this.state;
      const filterProd = products.filter((elem) => elem.brand === id);
      console.log(filterProd)
      this.setState({ filterBrands: filterProd })
    }
  }

  buttonsBrand = (prod) => {
    const brands = prod.map((elem) => elem.brand)
    const brandsNoRepeat = [...new Set(brands)]
    const brandsElement = brandsNoRepeat.map((elem) => (
      <button type='button' id={ elem } onClick={ (e) => this.filterBrand(e) }>{ elem }</button>
    ));
    return brandsElement
  }

  render() {
    const { errorMsg, searchProducts, filterProducts, products, filterBrands } = this.state;
    return (
      <div>
        <div>
          <label htmlFor='searchProducts'>Pesquisar produto: </label>
          <input type='text' id='searchProducts' value={ searchProducts } onChange={ (e) => this.typeEvent(e) } />
          <br />
          <button type='button' id='todos' onClick={ (e) => this.filterBrand(e) }>Todos</button>
          { this.buttonsBrand(products) }
        </div>
        <div>
          { errorMsg ? <p>{ errorMsg }</p> : filterBrands.length > 0 ? this.transformProd(filterBrands) : searchProducts ? this.transformProd(filterProducts) : this.transformProd(products) }
        </div>
      </div>
    )
  }
}

export default Phones
