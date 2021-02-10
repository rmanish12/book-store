const ResponseStatus = require('../response/status')

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.type = 'ValidationError',
        this.status = ResponseStatus.BAD_REQUEST
    }
}

module.exports = ValidationError