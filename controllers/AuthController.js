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
const issueJwt = require('../services/auth/issueJwtToken')

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
            
            const { _id, role } = employee
            const token = issueJwt({_id, role })
            
            const response = {
                employee: _.pick(employee, ['id', 'name', 'role', 'store']),
                token
            }
            
            res.status(ResponseStatus.OK).send(response)

        } catch (err) {
            console.error(LoggingMessage.EMP_LOGIN_FAILURE + err.message + err)
            err.message = ResponseMessage.EMP_LOGIN_FAILURE + err.message
            next(err)
        }

    }

    static verifyUser(req, res, next) {

        const { email, _id, name, role, store } = req.user

        console.log(LoggingMessage.EMP_LOGIN_REQUEST, email)

        const response = {
            employee: {
                id: _id,
                name,
                role,
                store: store ? { id: store._id, name: store.name } : null
            }
        }

        res.status(ResponseStatus.OK).send(response)

    }

}

module.exports = AuthController