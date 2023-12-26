
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { db } = require('./db/db')
const fs = require('fs')
const app = express() 


require('dotenv').config()

const port=process.env.PORT

//middlewares
app.use(express.json()) //as we want our data in json format
app.use(cors()) //as we do not have problems accessing our server

//routes
const routeFiles = fs.readdirSync('./routes')

routeFiles.map((route) => app.use('/api/v1', require('./routes/' + route)))

app.get('/', (req, res) => {
    res.send("Hello World")
})

//connecting to database
const server = () => {
    db()
    app.listen(port, () => {
        console.log("Server is running on port", port)
    })
}

server();