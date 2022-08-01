const sequelize = require('sequelize');
const db = require('../db')

const CadastroRedes = db.sequelize.define('rede',{
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
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    estado:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    pais:{
        type: db.Sequelize.STRING,
        allowNull: false
    }

})

CadastroRedes.sync();

//Isso fará com que o Sequelize sincronize com o BD. Caso não exista essa tabela, ele criará.
//CadastroRedes.sync();


//Para testar conexão, pesquisar sobre Async, await no Javascript.




module.exports = CadastroRedes;