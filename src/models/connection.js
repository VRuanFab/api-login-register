const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        userName: {type: String,  required: true, minLength: 4, maxLength: 20},
        password: {type: String, required: true, minLength: 4 },
        email: { type: String, reequired: true, minLength: 7 }
    },
    {
        timestamps: true
    }
)

const modelo = new mongoose.model('User', schema)

module.exports = modelo