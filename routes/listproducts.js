const express = require('express');
const client = require('../database/db');

var listProducts = express.Router();

listProducts.get('/products', async (req, res) => {
  const listProductsQuery = 'SELECT id, name, slogan, description, category, default_price FROM products WHERE id <= $1 AND id > $2';
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const params = [count * page, (count * page) - count];
  await client.query(listProductsQuery, params)
    .then(data => {
      res.status(200);
      res.send(data.rows);
    }
    )
    .catch(err => {
      res.status(404);
      res.send(err);
    }
    );
});

module.exports = listProducts;
