const connection = require('../db/connection')
const Schema = require('mongoose').Schema

const AddressSchema = new Schema({
    addressLine1: {
        type: String,
        required: [true, 'Address Line 1 is required in Address']
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String,
        required: [true, 'City is required in Address']
    },
    state: {
        type: String,
        required: [true, 'State is required in Address']
    },
    pinCode: {
        type: Number,
        min: [6, 'Pin code should be a 6 digit number']
    },
    country: {
        type: String,
        default: 'India'
    }
})

const Address = connection.model('Address', AddressSchema)

module.exports = Address