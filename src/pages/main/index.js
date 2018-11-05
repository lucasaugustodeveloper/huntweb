import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from "../../services/api";

import './styles.css';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      productInfo: {},
      page: 1,
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({
      products: docs,
      productInfo: productInfo,
      page
    });
  }

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  }

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }

  render() {
    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}

        <div className="actions">
          <button type="button" onClick={this.prevPage} disabled={page === 1}>Anterior</button>
          <button type="button" onClick={this.nextPage} disabled={page === productInfo.pages}>Próximo</button>
        </div>
      </div>
    );
  }
}

export default Main;
