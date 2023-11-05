const User = require('../models/User')
const bcrypt = require('bcrypt')

async function register(req, res) {
    try {
        const { username, password, confirmPassword } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        try {
            const user = await User.create({ username, password: hashedPassword })

            res.status(200).json({ message: 'User Created', user })
        } catch (error) {
            if(error.code === 11000) {
                return res.status(400).json({ message: 'User already in use'})
            }

            res.status(500).json({ message: 'Internal server error'})
        }

    } catch (error) {
        console.log(error)
    }
}

//Test request
async function insertUserData(req, res) {
    register({
        body: {
            username: "iamalinski",
            password: "test",
            confirmPassword: "test"
        }
    }, res)
}

module.exports = {
    register,
    insertUserData
}