const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/userControllers.js')
const cardControllers = require('../controllers/cardControllers.js')

/* GET home page. */
router.get('/', (req, res) => res.render('index', { title: 'Test in routes.js' }))

module.exports = router
