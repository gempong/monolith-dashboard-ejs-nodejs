const createError = require('http-errors')
const express = require('express')
const path = require('path')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const toastr = require('express-toastr')
const logger = require('morgan')
const expressLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const router = require('./routes')
const app = express()

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch')

// view engine setup
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', './layouts/default')

// Dependencies
app.use(cookieParser('secret'))
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))
app.use(flash())
app.use(toastr())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload())

app.use(function (req, res, next) {
  res.locals.toasts = req.toastr.render()
  next()
})

app.use(router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', { title: res.locals.message })
})

module.exports = app
