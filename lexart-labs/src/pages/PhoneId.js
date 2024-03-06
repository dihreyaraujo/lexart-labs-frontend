import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../style/PhoneId.css'

const PhoneId = () => {
  const [product, setProduct] = useState([]);
  const [errorMsg, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    verifyLogged();
  }, []);

  const verifyLogged = async () => {
    try {
      const url = 'http://localhost:3001/products';
      const token = JSON.parse(localStorage.getItem('tokenLexart'));
      const user = await axios.get(url, {
        headers: {
          "Authorization": token
        }
      });

      if (user.data) {
        const findProduct = user.data.find((elem) => Number(elem.id) === Number(id))
        setProduct(findProduct);
      }
    } catch (e) {
      setError(e.response.data.message);
    }
  }

  const typeEvent = ({ target }) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      [target.id]: target.value
    }));
  };

  const updateProduct = async () => {
    const url = 'http://localhost:3001/products';
    const token = JSON.parse(localStorage.getItem('tokenLexart'));
    try {
      const response = await axios.put(url, product, {
        headers: {
          Authorization: token,
          "Content-Type": 'application/json'
        }
      });
      if (response.data.message === 'Produto atualizado com sucesso') {
        window.location.assign('http://localhost:3000/products');
      } else {
        setError(response.data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  const transformProd = () => {
    const prodInHtml = (
      <div>
        <Header />
        <div className='form-update'>
          <div className='inputs-form'>
            <p>Nome: </p>
            <input type='text' value={ product.name } id={ "name" } onChange={(e) => typeEvent(e)} />
          </div>
          <div className='inputs-form'>
            <p>Marca: </p>
            <input type='text' value={ product.brand } id={ "brand" } onChange={(e) => typeEvent(e)} />
          </div>
          <div className='inputs-form'>
            <p>Modelo: </p>
            <input type='text' value={ product.model } id={ "model" } onChange={(e) => typeEvent(e)} />
          </div>
          <div className='inputs-form'>
            <p>Cor: </p>
            <input type='text' value={ product.color } id={ "color" } onChange={(e) => typeEvent(e)} />
          </div>
          <div className='inputs-form'>
            <p>Preço: </p>
            <input type='text' value={ product.price } id={ "price" } onChange={(e) => typeEvent(e)} />
          </div>
          <button type='button' className='att-button' onClick={ async () => await updateProduct() }>Atualizar</button>
        </div>
      </div>
    );
    return prodInHtml;
  }

  return (
    <div>
      {errorMsg ? <p>{errorMsg}</p> : transformProd()}
    </div>
  );
}

export default PhoneId;
