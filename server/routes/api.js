const express = require('express')
const router = express.Router()

const herbs = require('../controllers/herbs')
const herb = require('../controllers/herb')

router.get('', herbs)
router.get('/herb/:id', herb)

module.exports = router