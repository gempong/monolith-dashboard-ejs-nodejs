module.exports = {
  view: (req, res) => {
    const locals = {
      title: 'Dashboard',
      layout: './layouts/sidebar'
    }
    res.render('pages/index', locals)
  }
}
