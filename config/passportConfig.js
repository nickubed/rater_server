const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

let db = require('../models')

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    db.user.findByPk(id)
    .then(user => {
        cb(null, user)
    })
    .catch(cb)
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    db.user.findOne({
        where: {email: email}
    })
    .then(foundUser => {
        if(!foundUser || !foundUser.validPassword(password)){
            cb(null, null)
        }
        else {
            cb(null, foundUser)
        }
    })
    .catch(cb)
}))

module.exports = passport