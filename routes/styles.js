const express = require('express');
const client = require('../database/db');

const styles = express.Router();

styles.get('/products/:product_id/styles', async (req, res) => {
  const stylesQuery = 'SELECT style_id, name, original_price, sale_price, default_style FROM styles WHERE product_id = $1';
  const photosQuery = 'SELECT thumbnail_url, url FROM photos WHERE style_id = $1';
  const skuQuery = 'SELECT sku, style_id, quantity, size FROM sku WHERE style_id = $1';

  const styles = await client.query(stylesQuery, [req.params.product_id]);

  const stylesList = {};
  stylesList.product_id = req.params.product_id;
  stylesList.results = styles.rows;

  for (var result of stylesList.results) {
    const photos = await client.query(photosQuery, [result.style_id]);
    const skus = await client.query(skuQuery, [result.style_id]);
    result.photos = photos.rows;
    result.skus = skus.rows;
  }
  res.send(styles.rows);
});

module.exports = styles;
