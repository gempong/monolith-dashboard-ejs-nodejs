module.exports = {
  view: (req, res) => {
    const locals = {
      title: 'Cars',
      layout: './layouts/sidebar'
    }
    res.render('pages/car/index', locals)
  },
  create: (req, res) => {
    const locals = {
      title: 'Add New Car',
      layout: './layouts/sidebar'
    }
    res.render('pages/car/create', locals)
  },
  update: (req, res) => {
    const locals = {
      title: 'Update Car',
      layout: './layouts/sidebar'
    }
    res.render('pages/car/create', locals)
  }
}
