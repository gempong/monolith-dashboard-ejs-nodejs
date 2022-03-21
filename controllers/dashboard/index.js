module.exports = {
  // SHOW DASHBOARD
  view: (req, res) => {
    const locals = {
      title: 'Dashboard',
      layout: './layouts/sidebar'
    }
    res.render('pages/index', locals)
  }
}
