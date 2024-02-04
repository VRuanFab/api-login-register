const model = require('../models/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    const jwtKey = process.env.JWTKEY
    return jwt.sign({_id}, jwtKey, {expiresIn: '2d'})
}


const createUser = async (req, res) => {
    const {
        userName,
        password,
        email
    } = req.body

    let user = await model.findOne({ email })

    if(user){
        res.status(400).json('Usuário já cadastrado')
    }

    if(!userName || !password || !email){
        res.status(400).json('Por favor preencha todos os dados')
    }

    user = new model({ userName, password, email })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    .then((res) => {
        console.log(`usuario ${res.userName} foi criado com sucesso`)
    })
    .catch((err) => {
        console.log(err)
    })

    const token = createToken(user._id)

    res.status(200).json({_id: user._id, userName, email, token})
}

const loginUser = async (req, res) => {
    const {
        password,
        email
    } = req.body

    let user = await model.findOne({ email })

    if(!user){
        res.status(400).json('Dados incorretos')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid){
        res.status(400).json('Dados incorretos')
    }

    const token = createToken(user._id);

    res.status(200).json({_id: user._id, name: user.userName, email, token})
}

module.exports = { createUser, loginUser }