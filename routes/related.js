const express = require('express');
const client = require('../database/db');

const related = express.Router();

related.get('/products/:product_id/related', async (req, res) => {
  const relatedQuery = 'SELECT related_product_id FROM related_items WHERE product_id = $1';

  const related = await client.query(relatedQuery, [req.params.product_id]);
  const related_items = [];
  for (var relateditem of related.rows) {
    related_items.push(relateditem.related_product_id);
  }

  res.send(related_items);
});

module.exports = related;
