const { application } = require('express')
const express = require('express')
const router = express.Router()

//import model
const CadastroRede = require('../models/CadastroRede')

router.get('/', (req,res) =>{

    if(req.session.errors){
        var arrayErros = req.session.errors;    
        //Deixando a sessão vazia, para não mostrar os erros repetidamente.
        req.session.errors = "";
        return res.render('cadastrorede', {msg_error_cadastrorede: arrayErros})
    }
    
    if(req.session.success){
        req.session.success = "";
        return res.render('cadastrorede', {msg_success_cadastrorede: true,
                                           ver_redes_cadastradas: true})
    }
    
    res.render('cadastrorede');  
    
    
})


router.post('/', async (req,res) =>{
    
     const {nome, senha, endereco, numero, estado, pais} = req.body

     var erros = []

     if (nome =='' || typeof nome == undefined || nome == null){
        erros.push({mensagem: 'O campo "Nome da rede" não pode ser vazio!'});
    }

    if (senha =='' || typeof senha == undefined || senha == null){
        erros.push({mensagem: 'O campo "Senha" não pode ser vazio!'});
    }

    if (endereco =='' || typeof endereco == undefined || endereco == null){
        erros.push({mensagem: 'O campo "Endereço" não pode ser vazio!'});
    }

    if (numero =='' || typeof numero == undefined || numero == null){
        erros.push({mensagem: 'O campo "Número" não pode ser vazio!'});
    }

    if (estado =='' || typeof estado == undefined || estado == null){
        erros.push({mensagem: 'O campo "Estado" não pode ser vazio!'});
    }

    if (pais =='' || typeof pais == undefined || pais == null){
        erros.push({mensagem: 'O campo "País" não pode ser vazio!'});
    }

    if(erros.length > 0){
        req.session.errors = erros
        req.session.success = false
        return res.redirect('/cadastrorede')
    }else{

        req.session.erros = ""

        //inserir no banco de dados.
        await CadastroRede.create({
            nome: nome,
            senha: senha,
            endereco: endereco.toLowerCase(),
            numero: numero,
            estado: estado,
            pais: pais
        }).then(() =>{
            console.log('Rede cadastrada com sucesso.');
            req.session.success = true;
            return res.redirect('/cadastrorede')   

        }).catch((err) =>{
            console.log('Ocorreu um erro ao cadastrar a rede no banco de dados.'+err)
            req.session.errors = erros
            req.session.success = false
            return res.redirect('/cadastrorede')

        })


    }


        
        
    
     
})


module.exports = router