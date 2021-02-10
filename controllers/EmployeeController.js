const Employee = require('../models/Employee')

const ResponseStatus = require('../response/status')
const ResponseMessage = require('../constants/responseMessage')
const LoggingMessage = require('../constants/loggingMessage')
const ErrorMessage = require('../constants/errorMessage')
const Response = require('../response/response')
const AlreadyPresentException = require('../errors/alreadyPresent')

const sendGrid = require('../services/mail/sendMail')
const getMailContent = require('../services/mail/getMailContent')
const { generateHashedPassword } = require('../services/password/password')

class EmployeeController {

    static async addNewEmployee(req, res, next) {

        const { name, email, dateOfBirth, password, gender, store, role } = req.body
        console.log(LoggingMessage.ADD_NEW_EMPLOYEE_REQUEST, email)

        const randomPassword = Math.random().toString(36).slice(-8)
        const userPassword = password || randomPassword

        const hashedPassword = await generateHashedPassword(userPassword)

        try {

            const newEmployee = new Employee({
                name,
                email,
                dateOfBirth,
                password: hashedPassword,
                gender,
                store,
                role
            })

            const employee = await Employee.findOne({email})
            
            if(employee) {
                throw new AlreadyPresentException(ErrorMessage.USER_ALREADY_PRESENT)
            }

            await newEmployee.save()

            const mailContent = getMailContent(name, email, userPassword)

            await sendGrid.send(mailContent)
            console.log(LoggingMessage.WELCOME_MAIL_SENT)

            console.log(LoggingMessage.ADD_NEW_EMPLOYEE_SUCCESS, email)

            const response = new Response(ResponseStatus.OK, ResponseMessage.ADD_NEW_EMPLOYEE_SUCCESS, new Date())
            res.status(ResponseStatus.OK).send(response)

        } catch (err) {
            console.log(LoggingMessage.ADD_NEW_EMPLOYEE_FAILURE, err.message, err)
            err.message = ResponseMessage.ADD_NEW_EMPLOYEE_FAILURE + err.message

            next(err)
        }

    }

    static async getEmployees(req, res, next) {

        console.log(LoggingMessage.GET_ALL_EMP_REQUEST)

        const limit = 10;
        const page = req.query.page || 1

        try {

            const employees = await Employee.find({})
                .select(['name', 'email', 'dateOfBirth', 'dateOfJoining'])
                .limit(limit)
                .skip(limit * (page - 1))
                .populate({
                    path: 'store',
                    select: ['_id', 'name']
                })

            console.log(LoggingMessage.GET_ALL_EMP_SUCCESS)
            res.status(ResponseStatus.OK).send(employees)

        } catch (err) {
            console.log(LoggingMessage.GET_ALL_EMP_FAILURE + err.message + err)
            next(err)
        }

    }

}

module.exports = EmployeeController