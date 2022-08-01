const express = require('express')
const router = express.Router();
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

router.get('/', (req,res) =>{
//Se a sessão for true, se ela existir ...
if(req.session.errors){
    var arrayErros = req.session.errors;    
    //Deixando a sessão vazia, para não mostrar os erros repetidamente.
    req.session.errors = "";
    return res.render('cadastro', {msg_error: arrayErros})
}

if(req.session.success){
    req.session.success = "";
    return res.render('cadastro', {msg_success: true })
}

res.render('cadastro')  

    
})

router.post("/", async (req,res) =>{

    var {nome, email, senha, senha2} = req.body

    const erros = [];

    //VALIDAÇÕES - REMOVE OS ESPAÇOS EM BRANCO ANTES E DEPOIS.
    nome = nome.trim()
    email = email.trim()

    //LIMPAR O NOME DE CARACTERES ESPECIAIS. (apenas letras)
    nome = nome.replace(/[^A-zÀ-ú\s]/gi,''); 
    nome = nome.trim();


    //validações nome
    if (nome =='' || typeof nome == undefined || nome == null){
        erros.push({mensagem: 'O campo "Nome" não pode ser vazio!'});
    }
    //REGEX NOME
    if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)){
        console.log({mensagem:"Nome inválido!"})
        console.log({mensagem:"Nome inválido!"});
    }
    
    //validações email
    if (email =='' || typeof email == undefined || email == null){
    erros.push({mensagem: 'O campo "Email" não pode ser vazio!'});
    }
    //REGEX-EMAIL
   if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    console.log({mensagem:"Campo email inválido!"})
    console.log({mensagem:"Campo email inválido!"});
    }

    //validações senhas
    if(senha=='' || typeof senha == undefined || senha == null){
        erros.push({mensagem: "Senha inválida."})
    }

    if(senha != senha2){
        erros.push({mensagem: "As senhas não são iguais. Tente novamente."})
    }

    
    if(erros.length > 0){
        console.log(erros)
        req.session.errors = erros;
        req.session.success = false;
        return res.redirect('/cadastro')
    }else{
        //Validar se usuário já está cadastrado.
        const UsuarioExistente = await Usuario.findOne({where: {email: email}});
        if(UsuarioExistente){
            erros.push({mensagem: "Já existe um usuário com esse endereço de e-mail cadastrado no sistema."})
            req.session.errors = erros;
            req.session.success = false;
            return res.redirect('/cadastro')
            
        }

        //Gerar a senha hash com bcrypt.
        const salt = await bcrypt.genSalt(12);
        const hashSenha = await bcrypt.hash(senha, salt)

        //inserindo no banco.
        await Usuario.create({
            nome: nome,
            email: email.toLowerCase(),
            senha: hashSenha
        }).then(() =>{
        console.log('Usuário cadastrado com sucesso.');
        req.session.success = true;
        return res.redirect('/')
        }).catch((err) =>{
            console.log(`Ocorreu um erro ao inserir o usuário no BD. Erro:` + err);
        })
        //salvar no banco de dados.
        
        
    }

})

module.exports = router;