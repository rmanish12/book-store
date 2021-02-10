const connection = require('../db/connection')
const moment = require('moment')
const Schema = require('mongoose').Schema

const currentDate = moment(new Date()).format('DD-MM-YYYY')

const BookSaleOrderSchema = new Schema({
    customerName: {
        type: String,
        required: [true, 'Name of the customer is required']
    },
    customerPhoneNumber: {
        type: Number,
        min: 10,
        max: 10
    },
    issuedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    booksPurchased: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    date: {
        type: Date,
        default: currentDate
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required']
    }
})

const BookSaleOrder = connection.model('BookSaleOrder', BookSaleOrderSchema)

module.exports = BookSaleOrder