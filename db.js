const dotenv = require('dotenv')
require('dotenv').config()
const Sequelize = require ('sequelize')

const db_user = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const db_name = process.env.DB_NAME

//console.log(db_user,db_password, db_name)


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(db_name,db_user, db_password, {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        timestamps: true
    },
    //pra não ficar aparecendo logs no prompt de comando.
    logging: false
  });

  module.exports = {Sequelize, sequelize}

  