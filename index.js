require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')


//VARIÁVEIS DE AMBIENTE
const secretSession = process.env.SECRET_SESSION;


//CONFIG HANDLEBARS
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine', 'hbs');

//CONFIG ARQUIVOS ESTÁTICOS
app.use(express.static('public'));

//CONFIG LER RESPOSTAS EM JSON, E ENVIR OS DADOS PARA CONSEGUIRMOS OBTER VIA REQ.BODY
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

//CONFIG SESSION
app.use(session({
    secret: secretSession,
    resave: false,
    saveUninitialized: true
}))




//IMPORTAR MODELS
const Usuario = require('./models/Usuario')



//IMPORT ROTA LOGIN
const login = require('./routes/login')
app.use('/', login)

//IMPORT ROTA CADASTRO
const cadastro = require('./routes/cadastro')
app.use('/cadastro', cadastro)

//IMPORT ROTA HOME
const home = require('./routes/home')
app.use('/home', home)

//IMPORT ROTA CADASTRO REDE
const cadastrorede = require('./routes/cadastroRede')
app.use('/cadastrorede', cadastrorede)

//IMPORT ROTA EDITAR
const editar = require('./routes/editar')
app.use('/editar', editar)

//IMPORT ROTA DELETAR
const deletar = require('./routes/deletar')
app.use('/deletar', deletar)



app.listen(PORT, () =>{
    console.log('Server running on http://localhost:'+ PORT)
})

