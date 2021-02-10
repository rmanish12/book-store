// const mongoose = require('mongoose')
// const dotenv = require('dotenv')
// dotenv.config()

// const DB_STRING = process.env.DB_STRING

// const connection = mongoose.createConnection(DB_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('Connected to DB'))
// .catch(err => console.log('Error while connecting to DB'))


// module.exports = connection

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const DB_STRING = process.env.DB_STRING

// creating a DB connection 
const connection = mongoose.createConnection(
    DB_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () => console.log('DB connected')
)

module.exports = connection