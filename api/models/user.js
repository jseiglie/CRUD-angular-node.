const Sequelize = require('sequelize');
const db = require('../config/db');
const Users = db.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING(20),
        allowNull: false
        },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
}, {
    Sequelize,
    tableName: 'Users',
    timeStamp: true,
    indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
    ] 
}); 
 
module.exports = Users;