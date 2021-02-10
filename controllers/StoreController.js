const Store = require('../models/Store')
const Address = require('../models/Address')

const ResponseStatus = require('../response/status')
const ResponseMessage = require('../constants/responseMessage')
const LoggingMessage = require('../constants/loggingMessage')
const Response = require('../response/response')
const storeValidator = require('../validators/storeValidator')

class StoreController {

    static async createNewStore(req, res, next) {
        
        const { name, address } = req.body
        const { addressLine1, addressLine2, city, state, pinCode } = address

        console.log(LoggingMessage.CREATE_STORE_REQUEST, name)

        try {
            
            if(storeValidator(name, address)) {
                const newAddress = new Address({
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    pinCode
                })
                
                const addressCreated = await newAddress.save()
    
                const newStore = new Store({
                    name,
                    address: addressCreated._id
                })
    
                await newStore.save()
    
                console.log(LoggingMessage.CREATE_STORE_SUCCESS)

                const response = new Response(ResponseStatus.OK, ResponseMessage.STORE_SAVE_SUCCESS, new Date())
                res.status(ResponseStatus.OK).send(response)
            }

        } catch (err) {
            console.log(LoggingMessage.CREATE_STORE_FAILURE, err.message, err)
            err.message = ResponseMessage.STORE_SAVE_FAILURE + ' ' + err.message
            next(err)
        }

    }

    static async getStores(req, res, next) {

        console.log(LoggingMessage.GET_STORES_REQUEST)

        const limit = 5; // setting limit of pagination to 5
        const storeFilter = {}

        if(req.query.name) {
            const name = new RegExp(req.query.name) // for using LIKE operation in query
            storeFilter.name = name
        }

        const page = req.query.page || 1 // setting page number from query params or to default value of 1

        try {
            const stores = await Store.find(storeFilter)
                .select('name') // selecting only name
                .limit(limit)
                .skip(limit * (page - 1)) 
                .populate({
                    path: 'address',
                    // match: addressFilter,
                    select: ['addressLine1', 'addressLine2', 'city', 'state', 'pinCode']
                })

            console.log(LoggingMessage.GET_STORES_SUCCESS)
            
            res.status(ResponseStatus.OK).send(stores)
        } catch (err) {
            console.log(LoggingMessage.GET_STORES_FAILURE, err.message, err)
            next(err)
        }
    }

}

module.exports = StoreController