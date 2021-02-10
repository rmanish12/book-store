const connection = require('../db/connection')
const moment = require('moment')
const Schema = require('mongoose').Schema

const currentDate = moment(new Date()).format('DD-MM-YYYY')

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name of the employee is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    gender: {
        type: String
    },
    dateOfJoining: {
        type: Date,
        default: currentDate
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    },
    role: {
        type: [String],
        default: ['ROLE_EMP']
    },
    profilePhoto: {
        type: String
    }
})

EmployeeSchema.set('timestamps', true)

const Employee = connection.model('Employee', EmployeeSchema)

module.exports = Employee