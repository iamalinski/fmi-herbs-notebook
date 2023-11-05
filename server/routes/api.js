const express = require('express')
const router = express.Router()

const { herb, herbs, insertHerbData } = require('../controllers/herbs')
const { register, insertUserData } = require('../controllers/users')

router.get('', herbs)
router.get('/herb/:id', herb)
router.get('/herb-inser-test', insertHerbData)

router.post('/register', register)
router.get('/user-inser-test', insertUserData)

module.exports = router