const connection = require('../db/connection')
const Schema = require('mongoose').Schema

const BookSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name of the book is required']
    },
    author: {
        type: String,
        required: [true, 'Author of the book is required']
    },
    publisher: {
        type: String,
        required: [true, 'Publisher of the book is required']
    },
    publishedOn: {
        type: Date,
        required: [true, 'Date of publishment is required']
    },
    image: {
        type: String
    },
    numberOfCopiesForRent: {
        type: Number,
        default: 0
    },
    priceForRent: {
        type: Number,
        default: 0
    },
    numberOfCopiesForSale: {
        type: Number,
        default: 0
    },
    priceForSale: {
        type: Number,
        default: 0
    },
    perDayFineForLateReturn: {
        type: Number,
        default: 0
    }
})

BookSchema.set('timestamps', true)

const Book = connection.model('Book', BookSchema)

module.exports = Book