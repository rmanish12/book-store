const router = require('express').Router()

const EmployeeController = require('../controllers/EmployeeController')

router.post('/', EmployeeController.addNewEmployee)

router.get('/', EmployeeController.getEmployees)

module.exports = router