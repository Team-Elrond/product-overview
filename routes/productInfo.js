const express = require('express');
const client = require('../database/db');

const productInfo = express.Router();

productInfo.get('/products/:product_Id', async (req, res) => {
  const productInfoQuery = 'SELECT id, name, slogan, description, category, default_price FROM products WHERE id = $1';
  const featuresQuery = 'SELECT feature, value FROM features WHERE product_id = $1';
  const product = await client.query(productInfoQuery, [req.params.product_Id]);
  const features = await client.query(featuresQuery, [req.params.product_Id]);

  const productWithFeatures = product.rows[0];
  productWithFeatures.features = features.rows;
  res.send(productWithFeatures);
});

module.exports = productInfo;
