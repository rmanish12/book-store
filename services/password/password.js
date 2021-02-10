const bcrypt = require('bcrypt')

const generateHashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
}

const matchPassword = async (userPassword, dbPassword) => {
    console.log('sds: ',userPassword, dbPassword)
    const match = await bcrypt.compare(userPassword, dbPassword)
    return match;
}

module.exports = { generateHashedPassword, matchPassword }