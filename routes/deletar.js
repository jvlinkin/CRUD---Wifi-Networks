const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

//import model redes
const CadastroRede = require('../models/CadastroRede')

//DELETAR
router.post('/',  (req,res)=>{
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


module.exports = router