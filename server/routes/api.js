const express = require('express')
const router = express.Router()

const { herb, herbs, insertHerbData } = require('../controllers/herbs')
const { register, login, insertUserData, loginWithUserData } = require('../controllers/users')

router.get('', herbs)
router.get('/herb/:id', herb)

router.post('/register', register)
router.post('/login', login)


//tests
router.get('/user-inser-test', insertUserData)
router.get('/user-login-test', loginWithUserData)
router.get('/herb-inser-test', insertHerbData)

module.exports = router