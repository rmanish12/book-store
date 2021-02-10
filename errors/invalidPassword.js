const ResponseStatus = require('../response/status')

class InvalidPassword extends Error {
    constructor(message) {
        super(message)
        this.type = 'InvalidPassword',
        this.status = ResponseStatus.UNAUTHORIZED
    }
}

module.exports = InvalidPassword