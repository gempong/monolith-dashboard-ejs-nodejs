const passport = require('../../lib/passport')
module.exports = {
  login: passport.authenticate('local', {
    successRedirect: '/car',
    failureRedirect: '/login'
  })
}
