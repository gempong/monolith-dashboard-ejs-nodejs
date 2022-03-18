const router = require('express').Router()
const auth = require('./auth')
const dashboard = require('./dashboard')
const car = require('./car')

router.use('/', auth)

router.use('/', dashboard)
router.use('/car', car)

module.exports = router
