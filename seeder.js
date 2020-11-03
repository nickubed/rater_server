const db = require("./models");

db.user.create({
    name: 'Unregistered Users',
    email: 'null@null.com',
    password: 'coolDude',
    
})