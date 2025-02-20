require("dotenv").config();
const { Sequelize } = require('sequelize');
const User = require('../models/usersModel');
const Bank = require('../models/bankModel');                
const TypePayments = require('../models/typePaymentsModel');

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Para evitar erro de SSL
    }
  },
      logging: false, // Remove logs desnecessários no terminal
    }
);


// Inicializa o modelo User com a instância do Sequelize
const UserModel = User(sequelize);
const BankModel = Bank(sequelize);
const TypePaymentsModel = TypePayments(sequelize);

module.exports = {
    sequelize,
    User: UserModel,
    Bank: BankModel,
    TypePayments: TypePaymentsModel
};