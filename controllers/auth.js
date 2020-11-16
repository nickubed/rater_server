require('dotenv').config()
let jwt = require('jsonwebtoken')
let db = require('../models')
let router = require('express').Router()

router.post('/login', (req, res) => {
    db.user.findOne({where: {email: req.body.email}, include: [db.villager]})
    .then(user => {
        if(!user || !user.password){
            return res.status(404).send({message: 'User Not Found'})
        }

        if(!user.validPassword(user, req.body.password)){
            return res.status(406).send({message: 'Invalid Credentials'})
        }
        
        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 1
        })
        res.send({token})
    })
    .catch(err => {
        console.log('Error attempting to login: ', err)
        res.status(503).send({message: 'Database not responding.'})
    })
})

router.post('/signup', (req, res) => {
    db.user.findOne({where: {email: req.body.email}})
    .then(user => {
        if(user) {
            return res.status(409).send({message: 'Email already in use.'})
        }
        db.user.create(req.body)
        .then(newUser => {
            let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 1 //expires in one hour
            })
            res.send({token})
        })
        .catch(err => {
            console.log('Error when creating new user: ', err)
            res.status(500).send({message: 'Error when creating user.'})
        })
    })
    .catch(err => {
        console.log('Error occured on signup: ', err)
        res.status(503).send({message: 'Database Error.'})
    })
})

module.exports = router