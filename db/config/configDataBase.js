
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE,
    "host": process.env.MYSQLHOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE,
    "host": process.env.MYSQLHOST,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE,
    "host": process.env.MYSQLHOST,
    "dialect": process.env.DB_DIALECT
  }
}
