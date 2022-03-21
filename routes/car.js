const router = require('express').Router()
const { car } = require('../controllers')

router.get('/', car.view)
router.get('/create', car.create)
router.post('/create/store', car.create_store)
router.get('/update', car.update)

module.exports = router
