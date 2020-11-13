require('dotenv').config()
const db = require('../models')
const router = require('express').Router()

router.get('/:id', (req, res) => {
    db.user.findOne({where: {id: req.params.id}})
    .then(user => {
        res.send(user)
    })
})

module.exports = router