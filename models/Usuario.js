const sequelize = require('sequelize');
const db = require('../db')

const Usuario = db.sequelize.define('usuario',{
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type:db.Sequelize.STRING,
        allowNull: false
    }
})

//Isso fará com que o Sequelize sincronize com o BD. Caso não exista essa tabela, ele criará.
//Usuario.sync();



module.exports = Usuario;