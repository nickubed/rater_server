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
    // console.log('Hello', req.body.userChoice)
    let choices = req.body.userChoice
    db.user.findOne({where: {id: req.body.user}})
    .then(user => {
        async.forEach(choices, (choice, done) => {
            // console.log(choice)
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
                console.log(villager[0].id)
                user.addVillager(villager[0], { through: { grade: choice.grade }})
                .then(success => {
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
            console.log('Holy shit')
            res.send({message: 'success'})
        })
    })
})

module.exports = router