require('dotenv').config()
const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//signup ---> Create Route

router.post('/', async (req, res) => {
    try {
        const newUser = new db.User(req.body)
        await newUser.save()
        // make a token
        const token = createToken(newUser)
        res.json({token, user})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})



// login

// receive credential from the user
// verify that the credential are accurate
// if the credentials are accurate then you return a token

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await db.User.findOne({ email })
        if(!user) throw new Error(`Could not find this user in the database: User with email ${email}`)  
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) throw new Error(`The password credentials shared did not match the credentials for the user with email ${email}`)
        const token = createToken(user)
        res.json({ token, user })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})
// createToken
function createToken(user){
   return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' })
}

// show a user

// show all users

// delete a user

// update a user

// verify a token



// // 1) New User form
// router.get('/new', (req, res) => {
//     res.render('users/newUser', {currentUser: req.session.currentUser})
// })
// // 2) Post route to create user
// router.post('/', async (req, res) => {
//     // 1) hash the password
//     console.log(req.body)
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//     // 2) create the user
//     const newUser = await db.User.create(req.body) // req.body has form data to create new user
//     console.log(newUser)
//     res.redirect('/')
// })  

module.exports = router