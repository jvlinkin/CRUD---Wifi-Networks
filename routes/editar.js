const express = require('express')
const router = express.Router()

//import model das redes
const CadastroRedes = require('../models/CadastroRede')


router.post('/', (req,res) =>{
    const id = req.body.id
    CadastroRedes.findByPk(id).then((dados)=>{
        return res.render('editar', {error: false, 
                                    id: dados.id,
                                    nome: dados.nome,
                                    senha: dados.senha,
                                    endereco: dados.endereco,
                                    numero: dados.numero,
                                    estado: dados.estado,
                                    pais: dados.pais})
    }).catch((err)=>{
        console.log(err)
        return res.render('editar', {error: true, problema: 'Não é possível editar esse registro.'})
    })

})


router.post('/atualizar', (req,res)=>{


    const {nome, senha, endereco, numero, estado, pais, id} = req.body

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
        console.log(erros)
        return res.status(400).send({status: 400, erro: erros})
    }else{
        //inserir no banco atualizações.
        CadastroRedes.update(
        {
            nome: nome,
            senha: senha,
            endereco: endereco.toLowerCase(),
            numero: numero,
            estado: estado,
            pais: pais
        },{
            where: {
                id: id
            }
        }).then(()=>{
            return res.redirect('/home')
        }).catch((err)=>{
            console.log(err)
        })
    }

})



module.exports = router