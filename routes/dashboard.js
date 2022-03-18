const router = require('express').Router()
const { dashboard } = require('../controllers')

router.get('/', dashboard.view)

module.exports = router
