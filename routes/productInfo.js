const express = require('express');
const client = require('../database/db');

const productInfo = express.Router();

productInfo.get('/products/:product_id', async (req, res) => {
  const productInfoQuery = 'SELECT id, name, slogan, description, category, default_price, (SELECT json_agg(json_build_object(\'feature\', feature, \'value\', value)) FROM features WHERE product_id = $1) AS features FROM products where id = $1';
  await client.query(productInfoQuery, [req.params.product_id])
    .then(data => {
      res.status(200);
      res.send(data.rows[0]);
    }
    )
    .catch(err => {
      res.status(404);
      res.send(err);
    }
    );
  // const features = await client.query(featuresQuery, [req.params.product_id]);

  // const productWithFeatures = product.rows[0];
  // if (!productWithFeatures) {
  //   res.status(404);
  //   res.send({});
  // } else {
  //   productWithFeatures.features = features.rows;
  //   res.status(200);
  //   res.send(productWithFeatures);
  // }
});

module.exports = productInfo;
