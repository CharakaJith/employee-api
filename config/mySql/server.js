const mysql = require('mysql2');
const chalk = require('chalk');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')['development'];

const pool = mysql.createPool({
        connectionLimit: config.maxconnection, 
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database
});

// test connection
pool.getConnection((error, connection) => {
    if (error) {
        return console.log(
            chalk.white.bgRedBright.bold(` Unable to connect to the database: ${error.message} `)
        );
    }

    console.log(
        chalk.white.bgCyan.bold(` Connection has been established successfully. `)
    );
    connection.release();
});

module.exports = pool;