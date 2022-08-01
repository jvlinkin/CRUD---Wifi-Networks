const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')

//IMPORTAR MODELS
const Usuario = require('../models/Usuario')


router.get('/', (req,res) =>{

if(req.session.errors){
    var arrayErros = req.session.errors;
    req.session.errors = "";
    return res.render('login', {msg_error: arrayErros})
}

if(req.session.success){
    return res.render('login', {msg_success: true})
}

res.render('login')
           
})




router.post('/', async (req,res) =>{
    const {email, senha} = req.body


    var erros = [];

    if (email =='' || typeof email == undefined || email == null){
        erros.push({mensagem: 'O campo "Email" não pode ser vazio!'});
    }

    if (senha =='' || typeof senha == undefined || senha == null){
        erros.push({mensagem: 'O campo "Senha" não pode ser vazio!'});
    }
    
    if(erros.length>0){
        console.log(erros)
        req.session.errors = erros;
        req.session.success = false;
        return res.redirect('/')
    }
        
    //encontrar user no banco de dados.
    const UsuarioExistente = await Usuario.findOne({where: {email: email}});

    if(!UsuarioExistente){
        erros.push({mensagem: 'Usuário não cadastrado.'})
        req.session.errors = erros;
        req.session.success = false;
        return res.redirect('/')
    }

    //bcrypt compare, e se bater, deixar entrar.
    
    const matchSenha = await bcrypt.compare(senha, UsuarioExistente.senha)

        if(!matchSenha){
            erros.push({mensagem: 'Senha incorreta'})
            return res.redirect('/')
        }else{
            //GERAR TOKEN E TROCAR E ACESSAR ROTA PROTEGIDA.
            return res.redirect('home')
        }
            
        


        
        


    
    
    
})

module.exports = router