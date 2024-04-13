const dotenv = require('dotenv').config();

module.exports = {
  development: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    maxconnection: process.env.SQL_MAXCONN,
    dialect: 'mysql',
  },
  qa: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    maxconnection: process.env.SQL_MAXCONN,
    dialect: 'mysql',
  },
  production: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    maxconnection: process.env.SQL_MAXCONN,
    dialect: 'mysql',
  },
};