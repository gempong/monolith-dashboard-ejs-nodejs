const express = require('express')
const path = require('path')
const fs = require('fs')
const Car = require('../../models/car')
const moment = require('moment')
const app = express()
app.use(express.static(path.join(__dirname, 'public')))

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
    const id = Car.length > 0 ? Car[Car.length - 1].id + 1 : 1
    // VALIDATION
    if (!req.body.name) {
      req.toastr.error('Nama tidak boleh kosong')
      return res.redirect('/car')
    }
    if (!req.body.price) {
      req.toastr.error('Harga tidak boleh kosong')
      return res.redirect('/car')
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      req.toastr.error('Gambar tidak boleh kosong')
      return res.redirect('/car')
    }
    if (!req.body.start_rent) {
      req.toastr.error('Start rent tidak boleh kosong')
      return res.redirect('/car')
    }
    if (!req.body.finish_rent) {
      req.toastr.error('Finish rent tidak boleh kosong')
      return res.redirect('/car')
    }

    // UPLOAD FUNCTION
    const images = req.files.image
    images.mv(`public/upload/${id}_${images.name}`)

    // PUSH DATA
    const startRent = moment(req.body.start_rent)
    const finishRent = moment(req.body.finish_rent)
    const updateAt = moment().toDate()
    const createdAt = moment().toDate()

    const uploaded = `/upload/${id}_${images.name}`
    Car.push({ id: id, name: req.body.name, price: req.body.price, image: uploaded, start_rent: startRent, finish_rent: finishRent, update_at: updateAt, created_at: createdAt })
    req.toastr.success('Data Berhasil Disimpan')

    res.redirect('/car')
  },
  // SHOW UPDATE FORM
  update: (req, res) => {
    const locals = {
      title: 'Update Car',
      layout: './layouts/sidebar',
      dataUpdate: null
    }
    const foundIndex = Car.findIndex(x => x.id === parseInt(req.params.id))
    locals.dataUpdate = Car[foundIndex]
    res.render('pages/car/form', locals)
  },
  // UPDATE CAR FUNCTION
  update_store: (req, res, next) => {
    const foundIndex = Car.findIndex(x => x.id === parseInt(req.params.id))
    // VALIDATION
    if (!req.body.name) {
      req.toastr.error('Nama tidak boleh kosong')
      return res.redirect('/car')
    }
    if (!req.body.price) {
      req.toastr.error('Harga tidak boleh kosong')
      return res.redirect('/car')
    }
    if (!req.body.start_rent) {
      req.toastr.error('Start rent tidak boleh kosong')
      return res.redirect('/car')
    }
    if (!req.body.finish_rent) {
      req.toastr.error('Finish rent tidak boleh kosong')
      return res.redirect('/car')
    }

    // CHECK IF IMAGE CHANGE
    if (req.files) {
      if (Car[foundIndex].image !== '/images/car.png') {
        fs.unlinkSync(`public/${Car[foundIndex].image}`)
      }
      const images = req.files.image
      images.mv(`public/upload/${Car[foundIndex].id}_${images.name}`)
      const uploaded = `/upload/${Car[foundIndex].id}_${images.name}`
      Car[foundIndex].image = uploaded
    }

    // UPDATE DATA
    const startRent = moment(req.body.start_rent)
    const finishRent = moment(req.body.finish_rent)
    const updateAt = moment().toDate()

    Car[foundIndex].name = req.body.name
    Car[foundIndex].price = req.body.price
    Car[foundIndex].start_rent = startRent
    Car[foundIndex].finish_rent = finishRent
    Car[foundIndex].updated_at = updateAt

    req.toastr.success('Data Berhasil Diubah')
    res.redirect('/car')
  },
  // DELETE CAR FUNCTION
  destroy: (req, res, next) => {
    // FIND DATA BY ID AND DELETE IT
    const foundIndex = Car.findIndex(x => x.id === parseInt(req.params.id))
    if (Car[foundIndex].image !== '/images/car.png') {
      fs.unlinkSync(`public/${Car[foundIndex].image}`)
    }
    Car.splice(foundIndex, 1)

    req.toastr.info('Data Berhasil Dihapus')
    res.redirect('/car')
  }
}
