const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.loginUser)

module.exports = router