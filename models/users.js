const bycypt = require('bcrypt')
const admin = {
  id: Math.floor(Math.random() * 100), username: 'admin@admin.com', password: bycypt.hashSync('admin123', 10)
}

function User ({ id, username, password }) {
  this.id = id
  this.username = username
  this.password = password
  return this
}

User.findOne = function ({ username }) {
  if (username !== 'admin@admin.com') return Promise.resolve(null)
  const user = new User(admin)
  return Promise.resolve(user)
}

User.findByPk = function (id) {
  if (admin.id === id) {
    const user = new User(admin)
    return Promise.resolve(user)
  }
  return Promise.resolve(null)
}

User.prototype.verifyPassword = function (password) {
  return bycypt.compareSync(password, this.password)
}

module.exports = User
