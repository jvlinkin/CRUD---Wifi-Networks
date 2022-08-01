const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

//import model redes
const CadastroRede = require('../models/CadastroRede')

//DELETAR
router.post('/', checkToken, (req,res)=>{
    const id = req.body.id

    CadastroRede.destroy({
        where:{
            id: id
        }
    }).then((retorno)=>{
        return res.redirect('/home')
    }).catch((err)=>{
        console.log(err)
    })
    
})

function checkToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log(token)

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