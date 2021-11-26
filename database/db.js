const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client(process.env.DB_URL);
client.connect();

module.exports = client;
