require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./config/config.js')
connectDB()

let port = process.env.PORT

app.set('view engine', 'ejs')

app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }));

const home = require('./router/homerouter')

app.use('/', home)

app.listen(port, () => { console.log("running in " + port) })