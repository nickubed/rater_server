require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../models')
const villager = require('../models/villager')
const router = require('express').Router()

router.get('/', (req, res) => {
    db.villager.findAll()
    .then(response => {
        res.send(response)
    })
})

router.post('/new', (req, res) => {
    console.log('Hello', req.body.userChoice)
    db.villager.bulkCreate(req.body.userChoice)
    .then(villagers => {
        async.forEach(db.villager, (villager, done) => {
            db.user.findOne({where: {id: req.body.user}})
            .then(user => {
                villagers.addUser(user)
                .then(() => {
                    res.send({message: 'Successfully added'})
                })
                .catch(err => {
                    console.log(err)
                    res.send({message: 'Error'})
                })
            })
            .catch(err => {
                console.log(err)
                res.send({message: 'Error'})
            })
        })
    })
})

module.exports = router