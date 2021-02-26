const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

const issueJwt = ({ _id, role }) => {

    const payload = { _id, role }
    const expiresIn = '1d'

    const signedToken = jwt.sign(payload, jwtSecret, {
        expiresIn
    })

    return signedToken

}

module.exports = issueJwt