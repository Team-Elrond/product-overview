const express = require('express');
const client = require('../database/db');

const related = express.Router();

related.get('/products/:product_id/related', async (req, res) => {
  const relatedQuery = 'SELECT json_agg(related_product_id) AS related FROM related_items WHERE product_id = $1';
  await client.query(relatedQuery, [req.params.product_id])
    .then(data => {
      res.status(200);
      res.send(data.rows[0].related);
    })
    .catch(err => {
      res.status(404);
      res.send(err);
    });
});

module.exports = related;
