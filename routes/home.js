const express = require('express')
const router = express.Router();

//Model Usuario
const Usuario = require('../models/Usuario')
const CadastroRede = require('../models/CadastroRede')


router.get('/', async (req,res) =>{

        await CadastroRede.findAll().then((valores)=>{
            if(valores.length > 0){
                return res.render('home', {table: true, redes: valores.map(valores => valores.toJSON())})
            }else{
                req.session.errors = erros
                req.session.success = false
                res.render('home')
            }
        }).catch((err)=>{
            console.log('Ocorreu um problema:' + err)
        })
    //  await CadastroRede.findAll().then((valores)=>{
    //     //Pegando os valores e transformando em um JSON.
    //     //console.log(valores.map(valores => valores.toJSON()));
    //     if(valores.length > 0){
    //         return res.render('home', {table:true, redes: valores.map(valores => valores.toJSON())})
    //     }else{
    //         res.render('home', {table:false})
    //     }
        
    //  }).catch((err)=>{
    //     console.log(`Houve um prolema: ${err}`)
    //  })
    
    
})


module.exports = router