const ResponseStatus = require('../response/status')

class NotFound extends Error {
    constructor(message) {
        super(message)
        this.type = 'NotFound',
        this.status = ResponseStatus.NOT_FOUND
    }
}

module.exports = NotFound