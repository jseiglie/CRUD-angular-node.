const Sequelize = require("sequelize")
require('dotenv').config()

module.exports = new Sequelize(process.env.NODE_ENV_POSTGRE_DB, process.env.NODE_ENV_POSTGRE_USER, process.env.NODE_ENV_POSTGRE_PASS, {
    host: process.env.NODE_ENV_POSTGRE_HOST,
    dialect: "postgres",
    operatorAliases: false,
    port: process.env.NODE_ENV_POSTGRE_PORT,
    dialectOptions: {
        ssl:{
            require: true
        }
    }

})