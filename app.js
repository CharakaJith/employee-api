const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const pool = require('./config/mySql/server');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

// import routes
const admin = require('./routes/admin.routes');
const employee = require('./routes/employee.routes');

// set up routing paths
app.use('/api/admins', admin);
app.use('/api/employees', employee);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
      chalk.white.bgGreen.bold(' PORT ') +
        chalk.white.bgBlue.bold(` ${PORT} `) +
        chalk.white.bgGreen.bold(' MODE ') +
        chalk.white.bgRed.bold(` ${process.env.NODE_ENV} `)
    );
});