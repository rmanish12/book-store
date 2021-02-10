const connection = require('../db/connection')
const moment = require('moment')
const Schema = require('mongoose').Schema

const currentDate = moment(new Date()).format('DD-MM-YYYY')

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name of the customer is required']
    },
    dateOfBirth: {
        type: Date
    },
    joiningDate: {
        type: Date,
        default: currentDate
    },
    profilePhoto: {
        type: String
    },
    securityAmount: {
        type: Number,
        default: 1000
    },
    balanceAmount: {
        type: Number,
        default: 0
    }
})

CustomerSchema.set('timestamps', true)

const Customer = connection.model('Customer', CustomerSchema)

module.exports = Customer