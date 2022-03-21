const path = require('path')
const carModels = require('../../models/car')

const controllers = {
  view: (req, res) => {
    const locals = {
      car: carModels,
      title: 'List Car',
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
  create_store: (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }
    const sampleFile = req.files.image
    sampleFile.mv(path.join(__dirname, '../../public/upload/') + sampleFile.name, function (err) {
      if (err) {
        req.toastr.error('Data Gagal Disimpan')
      }

      const { name, price } = req.body
      const uploaded = '/upload/' + sampleFile.name

      carModels.push({ name, price, image: uploaded })
      req.toastr.success('Data Berhasil Disimpan')
      res.redirect('/car')
    })
  },

  update: (req, res) => {
    const locals = {
      title: 'Update Car',
      layout: './layouts/sidebar'
    }
    res.render('pages/car/create', locals)
  }
}

module.exports = controllers
