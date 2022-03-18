const router = require('express').Router()
const { car } = require('../controllers')

router.get('/car', car.view)

module.exports = router
