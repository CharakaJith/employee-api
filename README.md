<div align="center">
  <h2 ="center">employee-API</h2>
</div>

## Employee-API is a web API developed using MySQL, Express, and Node.js. Its purpose is to facilitate CRUD (Create, Read, Update, Delete) operations on an employee table.

The API allows clients to perform the following operations:

- Create: Add a new employee record to the employee table.
- Read: Retrieve employee records from the employee table.
- Update: Modify existing employee records in the employee table.
- Delete: Remove employee records from the employee table.

The API follows RESTful principles and provides endpoints for each CRUD operation. It leverages MySQL as the database management system to store employee data.

Employee-API is designed to be efficient, scalable, and secure, providing a seamless experience for managing employee data in applications.

### Built With
- [![Express][Express.js]][Express.js-url]
- [![Node][Node.js]][Node-url]
- [![MySQL][mysql]][mysql-url]

## Getting Started

### Prerequisites

- node.js: [Node.js download page](https://nodejs.org/en/download)
- MySQL: [MySql download page](https://dev.mysql.com/downloads/)

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/CharakaJith/employee-api.git
   ```
2. Set up the server
   
    i. Install NPM packages
   ```bash
   npm install
   ```   
   ii. Create an `.env.dev` file
   ```bash
   touch .env.dev
   ```

### `.env.dev` files setup

1. Enter following content in the `.env.dev` file in the server
    ```bash
   # environment variables
    NODE_ENV=development
    PORT=8000

    # mySQL database configurations
    SQL_USER=<DATABASE_USER>
    SQL_PASSWORD=<USER_PASSWORD>
    SQL_HOST=<DATABASE_HOST>
    SQL_DATABASE=<DATABASE_NAME>
    SQL_MAXCONN=150

    # defaults admin details
    ADMIN_NAME=<SAMPLE_NAME>
    ADMIN_EMAIL=<SAMPLE_EMAIL>
    ADMIN_PASSWORD=<RANDOM_PASSWORD>

    JWT_SECRET=<RANDOM_STRING>
   ```

### Setup database

1. Create database tables
   ```bash
   npm run migrate:up
   ```
2. Populate with sample data
    ```bash
   npm run seed:up:all
   ```

### Start the project

1. Start development server
   ```bash
   npm run dev
   ```

## Documentations

- [Download API Documentation](https://jith420.atlassian.net/l/cp/f5G0TvyW)
- [Download Getting Started](https://jith420.atlassian.net/l/cp/XuHvyqa7)



## Contact
Email: [charaka.info@gmail.com](mailto:charaka.info@gmail.com) | LinkedIn: [Charaka Jith Gunasinghe](https://www.linkedin.com/in/charaka-gunasinghe-6742861b9/)

<!-- MARKDOWN LINKS & IMAGES -->
[Node.js]: https://img.shields.io/badge/Node.js-12A952?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/
[mysql]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[mysql-url]: https://dev.mysql.com/