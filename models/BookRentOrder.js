const connection = require('../db/connection')
const moment = require('moment')
const Schema = require('mongoose').Schema

const startDate = moment(new Date()).format('DD-MM-YYYY')

const BookRentOrderSchama = new Schema({
    issuedTo: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    booksIssued: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    issuedOn: {
        type: Date,
        default: startDate
    },
    returnOn: {
        type: Date,
        default: moment(startDate, 'DD-MM-YYYY').add(15, 'days')
    },
    totalAmount: {
        type: Number,
        default: 0
    }
})

BookRentOrderSchama.set('timestamps', true)

const BookRentOrderSchama = connection.model('BookRentOrder', BookRentOrderSchama)

module.exports = BookRentOrderSchama