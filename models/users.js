const bycypt = require('bcrypt')
const User = {
  id: Math.floor(Math.random() * 100), username: 'admin@admin.com', password: bycypt.hashSync('admin123', 10), login: false
}

module.exports = User
