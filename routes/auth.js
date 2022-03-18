const router = require('express').Router()
const { auth } = require('../controllers')

router.get('/login', auth.login)
router.post('/login/store', auth.api.login)

module.exports = router
