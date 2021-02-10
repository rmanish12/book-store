const ValidationError = require('../errors/validationError')
const ErrorMessage = require('../constants/errorMessage')

const storeValidator = (name, address) => {

    if(!name) {
        throw new ValidationError(ErrorMessage.STORE_NAME_REQUIRED)
    }

    if(!address) {
        throw new ValidationError(ErrorMessage.STORE_ADDRESS_REQUIRED)
    }

    if(!address.addressLine1) {
        throw new ValidationError(ErrorMessage.STORE_ADDRESS_LINE_1_REQUIRED)
    }

    if(!address.city) {
        throw new ValidationError(ErrorMessage.STORE_CITY_REQUIRED)
    }

    if(!address.state) {
        throw new ValidationError(ErrorMessage.STORE_CITY_REQUIRED)
    }

    if(!address.pinCode || typeof address.pinCode !== 'number' || address.pinCode.toString().length !==6 ) {
        throw new ValidationError(ErrorMessage.STORE_PIN_CODE_REQUIRED)
    }

    return true

}

module.exports = storeValidator