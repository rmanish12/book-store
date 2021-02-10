const ResponseStatus = require('../response/status')

class AlreadyPresent extends Error {

    constructor(message) {
        super(message)
        this.type = 'AlreadyPresent',
        this.status = ResponseStatus.CONFLICT
    }

}

module.exports = AlreadyPresent