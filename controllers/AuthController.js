const _ = require('lodash')

const Employee = require('../models/Employee')

const ResponseStatus = require('../response/status')
const ResponseMessage = require('../constants/responseMessage')
const LoggingMessage = require('../constants/loggingMessage')
const Response = require('../response/response')
const NotFoundException = require('../errors/notFound')
const InvalidPasswordException = require('../errors/invalidPassword')
const ErrorMessage = require('../constants/errorMessage')
const { matchPassword } = require('../services/password/password')

class AuthController {

    static async loginUser(req, res, next) {

        const { email, password } = req.body
        console.log(LoggingMessage.EMP_LOGIN_REQUEST, email)

        try {
            let employee = await Employee.findOne({email})
                .select(['id', 'name' , 'password', 'role'])
                .populate({
                    path: 'store',
                    select: ['_id', 'name']
                })

            if(!employee) {
                throw new NotFoundException(ErrorMessage.USER_NOT_FOUND)
            }

            const passwordMatch = await matchPassword(password, employee.password)

            if(!passwordMatch) {
                throw new InvalidPasswordException(ErrorMessage.PASSWORD_MISMATCH)
            }

            console.log(LoggingMessage.EMP_LOGIN_SUCCESS + email)

            res.status(ResponseStatus.OK).send(_.pick(employee, ['id', 'name', 'role', 'store']))

        } catch (err) {
            console.error(LoggingMessage.EMP_LOGIN_FAILURE + err.message + err)
            err.message = ResponseMessage.EMP_LOGIN_FAILURE + err.message
            next(err)
        }

    }

}

module.exports = AuthController