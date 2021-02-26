const express = require('express')
const cors = require('cors')

const app = express()
const dotenv = require('dotenv')
dotenv.config()

require('./db/connection')

const PORT = process.env.APP_PORT

const auth = require('./routes/auth')
const store = require('./routes/store')
const employee = require('./routes/employee')

const errorHandler = require('./errorHandler/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', auth)
app.use('/store', store)
app.use('/employee', employee)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))