require('dotenv').config()
const async = require('async')
const db = require('../models')
const router = require('express').Router()

router.get('/', (req, res) => {
    db.villager.findAll()
    .then(response => {
        res.send(response)
    })
})

router.get('/allVillagers', (req, res) => {
    matrix = {
        S: 10,
        A: 9,
        B: 8,
        C: 7,
        D: 6,
        F: 5
    }
    reverseMatrix = {
        10: 'S',
        9: 'A',
        8: 'B',
        7: 'C',
        6: 'D',
        5: 'F'
    }
    db.villager.findAll({include: [db.user]})
    .then(villagers => {
        // console.log(villagers)
        villagers.forEach(v => {
            let sum = 0
            let count = 0
            v.users.forEach(u => {
                sum += matrix[u.usersVillagers.grade]
                count++
            })
            console.log(v.name, 'Average: ', reverseMatrix[Math.round(sum / count)])
        })
        res.send("christ.")
    })
})

router.get('/:id', (req, res) => {
    db.user.findOne({where: {id: req.params.id}, include: [db.villager]})
    .then(user => {
        res.send(user.villagers)
    })
    .catch(err => {
        console.log(err)
        res.send({message: 'error fetching user'})
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