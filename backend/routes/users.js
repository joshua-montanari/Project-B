const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model');

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
                email: user.email
            },
        })
   
   } catch (error) {
    res.status(500).json(err)
   }
})

module.exports = router