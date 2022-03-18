module.exports = {
  login: (req, res) => {
    const locals = {
      title: 'Logins',
      layout: './layouts/default'
    }
    res.render('pages/auth/login', locals)
  },
  api: require('./api')
}
