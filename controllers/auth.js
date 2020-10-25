require('dotenv').config()
let jwt = require('jsonwebtoken')
let db = require('../models')
let router = require('express').Router()

router.post('/login', (req, res) => {
    db.User.findOne({email: req.body.email})
    .then(user => {
        if(!user || !user.password){
            return res.status(404).send({message: 'User Not Found'})
        }

        if(!user.validPassword(req.body.password)){
            return res.status(406).send({message: 'Invalid Credentials'})
        }
        
        let token = jwt.sign(user.toJSON(), )
    })
})