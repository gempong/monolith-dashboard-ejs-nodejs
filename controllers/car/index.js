module.exports = {
  view: (req, res) => {
    const locals = {
      title: 'Cars',
      layout: './layouts/sidebar'
    }
    res.render('pages/car/index', locals)
  }
}
