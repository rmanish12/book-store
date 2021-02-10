const connection = require('../db/connection')
const Schema = require('mongoose').Schema

const StoreSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Store name is required']
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

StoreSchema.set('timestamps', true)

const Store = connection.model('Store', StoreSchema)

module.exports = Store