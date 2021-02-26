const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const dotenv = require('dotenv')
dotenv.config()

const Employee = require('../models/Employee')

const jwtSecret = process.env.JWT_SECRET

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}

const callbackFunction = (payload, done) => {

    Employee.findOne({_id: payload._id})
        .then(user => {
            if(!user) {
                return done(null, false)
            }

            return done(null, user)
        })
        .catch(err => {
            return done(err, false)
        })

}

const strategy = new JwtStrategy(options, callbackFunction)

passport.use('jwt', strategy)

module.exports = passport