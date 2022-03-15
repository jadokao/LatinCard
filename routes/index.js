const express = require('express')
const axios = require('axios')
const router = express.Router()

const userControllers = require('../controllers/userControllers.js')
const cardControllers = require('../controllers/cardControllers.js')

/* GET home page. */
router.get('/', (req, res) => res.render('index', { title: 'Test in routes.js' }))
router.get('/search', (req, res) => {
	axios.get(`https://latinwordnet.exeter.ac.uk/api/lemmas/${req.query.word}/n/`).then(response => {
		return res.json(response.data.results)
	})
})

module.exports = router
