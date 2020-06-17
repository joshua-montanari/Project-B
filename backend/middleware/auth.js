const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try{
        const token = req.header('x-auth-token')
        if (!token)
            return res.status(401).json({msg: 'no authentification token, authorization denied'})

        const verified = jwt.verify(token, process.env.JWT_SECRET) //verify function checked the token with the  secret and returns the decoded info
        if (!verified)
        return res.status(401).json({msg: 'token verification failed'})

        req.user = verified.id
        next()
    }catch (error) {
     res.status(500).json(error)
    }
}   

module.exports = auth