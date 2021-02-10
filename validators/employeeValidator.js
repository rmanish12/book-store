const ValidationError = require('../errors/validationError')
const ErrorMessage = require('../constants/errorMessage')

const EmployeeValidator = (name, email, dateOfBirth) => {

    if(!name) {
        throw new ValidationError(ErrorMessage.EMP_NAME_REQUIRED)
    }

    if(!email) {
        throw new ValidationError(ErrorMessage.EMP_EMAIL_REQUIRED)
    }

    if(!dateOfBirth) {
        throw new ValidationError(ErrorMessage.EMP_DOB_REQUIRED)
    }

    return true

}

module.exports = EmployeeValidator