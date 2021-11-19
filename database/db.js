const { Client } = require('pg');


const client = new Client({
  user: 'ajpsyk',
  host: 'localhost',
  database: 'product_overview',
  password: '',
  port: 5432
});


client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to postgres');
  }
});

module.exports = client;