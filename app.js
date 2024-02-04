require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors({
    origin: '*',
    methods: '*'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGOLINK)

const login = require('./src/routes/connection')
app.use('', login)

app.listen(8080, () => {
    console.log('api roando em http://localhost:8080')
})