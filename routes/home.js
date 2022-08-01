const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

//Model Usuario
const Usuario = require('../models/Usuario')
const CadastroRede = require('../models/CadastroRede')


router.get('/', checkToken, async (req,res) =>{

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
    
})


function checkToken(req,res,next){
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({msg: "Token inexistente."})
    }

    try {
        const secret = process.env.SECRET_APPLICATION
        jwt.verify(token, secret)
        console.log('Autenticação realizada com sucesso!')
        next()
        
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: 'Token inválido'})
        
    }
}


module.exports = router