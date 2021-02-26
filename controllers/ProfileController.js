const Employee = require('../models/Employee')

const ResponseStatus = require('../response/status')
const ResponseMessage = require('../constants/responseMessage')
const LoggingMessage = require('../constants/loggingMessage')
const ErrorMessage = require('../constants/errorMessage')
const NotFoundException = require('../errors/notFound')
const Response = require('../response/response')
const { matchPassword } = require('../services/password/password')
const { generateHashedPassword } = require('../services/password/password')

class ProfileController {

    static getEmployeeProfile(req, res, next) {

        const { id } = req.params

        console.log(LoggingMessage.GET_ALL_EMP_REQUEST, id)
        
        try {
            const employee = await Employee.findById(id).populate('store')

            if(!employee) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND)
            }

            console.log(LoggingMessage.GET_EMP_PROFILE_SUCCESS, id)
            
            res.status(ResponseStatus.OK).send(employee)

        } catch (err) {
            console.error(LoggingMessage.GET_EMP_PROFILE_FAILURE + id + ' ' + err)
            next(err)
        }

    }

    static updateEmployeePassword(req, res, next) {

        const  { id } = req.params
        const { oldPassword, newPassword } = req.body

        console.log(LoggingMessage.EMP_PASS_UPDATE_REQUEST, id)

        try {

            const employee = await Employee.findById(id)

            const passwordMatch = matchPassword(oldPassword, employee.password)

            if(!passwordMatch) {
                throw new InvalidPasswordException(ErrorMessage.PASSWORD_MISMATCH)
            }

            const hashedPassword = await generateHashedPassword(newPassword)
            employee.password = hashedPassword

            await employee.save()

            console.log(LoggingMessage.EMP_PASS_UPDATE_SUCCESS, id)

            const response = new Response(ResponseStatus.OK, ResponseMessage.EMP_PASS_UPDATE_SUCCESS, new Date())
            res.status(ResponseStatus.OK).send(response)

        } catch (err) {
            console.error(LoggingMessage.EMP_PASS_UPDATE_FAILURE, id + ' ' + err)
            next(err)
        }
    }

}

module.exports = ProfileController