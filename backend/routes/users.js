const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../models/user.model')

router.post('/register', async(req, res) => {
    try{
        let { email, password, passwordCheck, username } = req.body

        //register user validation
        if (!email || !password || !passwordCheck)
            return res.status(400).json({ msg: 'not all fields have been entered'})
        if (password.length < 5)
            return res
                .status(400)
                .json({msg: 'password needs to be at least 5 characters long'})
        if (password !== passwordCheck)
            return res.status(400).json({msg: 'passwords need to match'})

        const exsistingUser = await User.findOne({email: email})
        if(exsistingUser)
            return res.status(400).json({msg: 'user already exists'})
        
        if(!username) username = email

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt) //password encryption

        //create and store user
        const newUser = new User({
            email,
            password: passwordHash,
            username,
        })

        const savedUser = await newUser.save()
            res.json(savedUser)
                
    } catch (err) {
        res.status(500).json(err)
    }
})

//login page router
router.post('/login', async (req, res) =>{
   try {
       const{ email, password} = req.body

       //login validation
        if (!email || !password)
            return res.status(400).json({ msg: 'not all fields have been entered'})

        const user = await User.findOne({email: email}) //finds a user that matches the entered email
        
        if(!user)
            return res.status(400).json({ msg: 'no account with this email has been created'})

        const isMatch = await bcrypt.compare(password, user.password) //compares entered password to the enxypted password in the database

        if(!isMatch)
            return res.status(400).json({ msg: 'the password you entered is not correct'})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET) //connects a jwt to a user id, JWT_SECRET is an env password, to make sure that a jwt is created by this application
        res.json({
            token,
            user:{
                id: user._id,
                username: user.username,
            },
        })
   
   } catch (error) {
    res.status(500).json(error)
   }
})

router.delete('/delete', auth, async(req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    }catch (error) {
        res.status(500).json(error)
    }
})

router.post('/tokenIsValid', async(req, res) => {
    try {
        //token validaton checks
        const token = req.header('x-auth-token')
        if (!token) return res.json(false) //return if there is no token

        const verified = jwt.verify(token, process.env.JWT_SECRET) //see middleware/auth for jwt.verify definition
        if (!verified) return res.json(false) // return if token is not verified

        const user = await User.findById(verified.id)
        if (!user) return res.json(false) //return if the user the token repersents is not in the database

        //if all checks pass, the token is valid and returns true
        return res.json(true)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', auth, async (req, res) => { //finds the user that is logged in
    const user = await User.findById(req.user)
    res.json({ //makes sure we dont display user email and password in the console
        username: user.username,
        id: user._id
    })
})

module.exports = router