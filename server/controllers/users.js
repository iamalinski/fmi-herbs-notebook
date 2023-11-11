const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

async function register(req, res) {
  try {
    const { username, password, confirmPassword } = req.body

    if (!password) {
      return res.status(400).json({ message: "Password is required." })
    }

    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password confirmation is required." })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await User.create({ username, password: hashedPassword })

      res.status(200).json({ message: "User Created.", user })
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "User already in use." })
      }

      res.status(500).json({ message: "Internal server error." })
    }
  } catch (error) {
    console.log(error)
    req.status(500).json({ message: "Server error" })
  }
}

async function login(req, res) {
  const { username, password } = req.body

  if (!username) {
    return res.status(400).json({ message: "Username is required." })
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." })
  }

  const user = await User.findOne({ username })

  try {
    const { username, _id } = user

    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({
        message: "Authentication failed. Invalid username or password.",
      })
    }

    return res.json({
      username,
      _id,
      token: jwt.sign({ username, _id }, jwtSecret),
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  register,
  login,
}
