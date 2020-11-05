require('dotenv').config()
const async = require('async')
const jwt = require('jsonwebtoken')
const db = require('../models')
const router = require('express').Router()

router.get('/', (req, res) => {
    db.villager.findAll()
    .then(response => {
        res.send(response)
    })
})

router.post('/new', (req, res) => {
    let choices = req.body.userChoice
    db.user.findOne({where: {id: req.body.user}})
    .then(user => {
        async.forEach(choices, (choice, done) => {
            db.villager.findOrCreate({
                where: {
                    name: choice.name
                },
                defaults: {
                    name: choice.name,
                    personality: choice.personality,
                    img: choice.img,
                    apiId: choice.apiId
                }
            }).then((villager, wasCreated) => {
                user.addVillager(villager[0], { through: { grade: choice.grade }})
                .then(() => {
                    done()
                })
            .catch(err => {
                console.log(err)
                done()
            })
        })
        .catch(err => {
            console.log(err)
            res.send({message: 'Error'})
        })
        }, () => {
            res.send({message: 'success'})
        })
    })
})

module.exports = router