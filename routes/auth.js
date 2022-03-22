const router = require('express').Router()
const User = require('../models/users')

const { auth } = require('../controllers')

// MIDDLEWARE GET AUTH
function checkLogin (req, res, next) {
  if (User.login === false) {
    next()
  } else {
    res.redirect('/')
  }
}

router.get('/login', checkLogin, auth.login)
router.post('/login/store', checkLogin, auth.login_store)
router.get('/logout', auth.logout)

module.exports = router
