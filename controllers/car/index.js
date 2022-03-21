const path = require('path')
const Car = require('../../models/car')

module.exports = {
  // VIEW LIST OF CAR
  view: (req, res) => {
    const locals = {
      car: Car,
      title: 'List Car',
      layout: './layouts/sidebar'
    }
    res.render('pages/car/index', locals)
  },
  // SHOW CREATE FORM
  create: (req, res) => {
    const locals = {
      title: 'Add New Car',
      layout: './layouts/sidebar'
    }
    res.render('pages/car/form', locals)
  },
  // CREATE NEW CAR FUNCTION
  create_store: (req, res, next) => {
    const id = Car[Car.length - 1].id + 1
    if (!req.body.name) {
      req.toastr.error('Nama tidak boleh kosong')
      res.redirect('/car')
    }
    if (!req.body.price) {
      req.toastr.error('Harga tidak boleh kosong')
      res.redirect('/car')
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      req.toastr.error('Gambar tidak boleh kosong')
      res.redirect('/car')
    }
    const images = req.files.image
    images.mv(path.join(__dirname, '../../public/upload/') + images.name, function (err) {
      if (err) {
        req.toastr.error('Data Gagal Disimpan')
      } else {
        const { name, price } = req.body
        const uploaded = '/upload/' + images.name
        Car.push({ id: id, name, price, image: uploaded })
        req.toastr.success('Data Berhasil Disimpan')
      }
      res.redirect('/car')
    })
  },
  // SHOW UPDATE FORM
  update: (req, res) => {
    const locals = {
      title: 'Update Car',
      layout: './layouts/sidebar',
      dataUpdate: null
    }
    const foundIndex = Car.findIndex(x => x.id == req.params.id)
    locals.dataUpdate = Car[foundIndex]
    res.render('pages/car/form', locals)
  },
  // UPDATE CAR FUNCTION
  update_store: (req, res, next) => {
    const foundIndex = Car.findIndex(x => x.id == req.params.id)
    if (!req.body.name) {
      req.toastr.error('Nama tidak boleh kosong')
      res.redirect('/car')
    }
    if (!req.body.price) {
      req.toastr.error('Harga tidak boleh kosong')
      res.redirect('/car')
    }
    if (req.files) {
      const images = req.files.image
      images.mv(path.join(__dirname, '../../public/upload/') + images.name, function (err) {
        if (err) {
          req.toastr.error('Data Gagal Disimpan')
        }
        const uploaded = '/upload/' + images.name
        Car[foundIndex].image = uploaded
      })
    }
    Car[foundIndex].name = req.body.name
    Car[foundIndex].price = req.body.price

    req.toastr.success('Data Berhasil Diubah')
    res.redirect('/car')
  },
  // DELETE CAR FUNCTION
  destroy: (req, res, next) => {
    const foundIndex = Car.findIndex(x => x.id == req.params.id)
    Car.splice(foundIndex, 1)

    req.toastr.info('Data Berhasil Dihapus')
    res.redirect('/car')
  },
}
