const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
dotenv.config()

const API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(API_KEY)

module.exports = sgMail