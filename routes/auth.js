const router = require('express').Router()
const passport = require('../passport/jwtAuth')

const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.loginUser)

router.get('/who', passport.authenticate('jwt', { session: false }), AuthController.verifyUser)

module.exports = router