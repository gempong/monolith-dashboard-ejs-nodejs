const router = require('express').Router()
const { car } = require('../controllers')

router.get('/', car.view)
router.get('/create', car.createForm)
router.post('/create/store', car.create)
router.get('/update/:id', car.updateForm)
router.post('/update/store/:id', car.update)
router.post('/delete/:id', car.destroy)

module.exports = router
