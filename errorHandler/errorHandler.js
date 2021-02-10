const ResponseMessage = require('../constants/responseMessage')
const Response = require('../response/response')
const ResponseStatus = require('../response/status')

const errorHandler = (err, req, res, next) => {

    if(err.type==='ValidationError') {
        const response = new Response(err.status, err.message, new Date())
        res.status(err.status).send(response)
    } else if(err.type==='AlreadyPresent') {
        const response = new Response(err.status, err.message, new Date())
        res.status(err.status).send(response)
    } else if(err.type==='InvalidPassword') {
        const response = new Response(err.status, err.message, new Date())
        res.status(err.status).send(response)
    } else if(err.type==='NotFound') {
        const response = new Response(err.status, err.message, new Date())
        res.status(err.status).send(response)
    }else {

        const response = new Response(ResponseStatus.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR, new Date())
        res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send(response)

    }

}

module.exports = errorHandler