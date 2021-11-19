const express = require('express');
const client = require('../database/db.js');

var router = express.Router();


router.get('/products', async(req, res) => {
  const listProductsQuery = 'SELECT name, slogan, description, category, default_price FROM products LIMIT $1 OFFSET $2;';
  let params = [req.query.count, (req.query.page - 1) * req.query.count];
  let results = await client.query(listProductsQuery, params);
  res.send(results.rows);
});

module.exports = router;