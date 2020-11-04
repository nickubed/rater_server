require('dotenv').config()
const cors = require('cors')
const express = require('express')
const expressJwt = require('express-jwt')
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/villager', require('./controllers/villager'))
app.use('/auth', require('./controllers/auth'))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('*', (req, res) => {
    res.status(404).send({message: 'Not Found'})
})

app.listen(PORT, () => {console.log(`App is listening on port: ${PORT}`)})