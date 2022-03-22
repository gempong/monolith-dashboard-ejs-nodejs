const bycypt = require('bcrypt')
const User = {
  id: 1, username: 'admin@admin.com', password: bycypt.hashSync('admin123', 10), login: false
}

module.exports = User
