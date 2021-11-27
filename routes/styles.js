const express = require('express');
const client = require('../database/db');

const styles = express.Router();

styles.get('/products/:product_id/styles', async (req, res) => {
  const styleIdQuery = 'SELECT style_id, name, original_price, sale_price, "default?", COALESCE (jsonb_agg(DISTINCT jsonb_build_object(\'thumbnail_url\', thumbnail_url, \'url\', url)) FILTER (WHERE photos.url IS NOT NULL), \'[]\') AS photos, COALESCE (jsonb_object_agg(sku, jsonb_build_object(\'quantity\', quantity, \'size\', size )) FILTER (WHERE sku.quantity IS NOT NULL), \'{}\') AS skus FROM styles LEFT JOIN photos ON photos.style_id_photos = styles.style_id LEFT JOIN sku ON sku.style_id_sku = styles.style_id WHERE product_id = $1 GROUP BY styles.style_id';
  const styleIdQueryCTE = 'WITH style_id_cte AS (SELECT style_id, FROM styles WHERE product_id = $1) SELECT style_id, name, original_price, sale_price, default_style, json_agg(json_build_object(\'thumbnail_url\', thumbnail_url, \'url\', url)) AS photos FROM styles, photos WHERE style_id IN (SELECT style_id FROM style_id_cte)';
  await client.query(styleIdQuery, [req.params.product_id])
    .then(data => {
      const styles = {
        product_id: req.params.product_id,
        results: data.rows
      };
      res.send(styles);
    });
//     .catch(err => {
//       res.status(404);
//       res.send(err);
//     });
 });

module.exports = styles;
