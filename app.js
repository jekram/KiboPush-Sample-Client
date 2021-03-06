var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('client-sessions')

var index = require('./routes/index')
var userInformation = require('./routes/userInformation')
var pages = require('./routes/pages')
var surveys = require('./routes/surveys')
var workflows = require('./routes/workflows')
var autoPosting = require('./routes/autoPosting')
var polls = require('./routes/polls')
var subscribers = require('./routes/subscribers')
var dashboard = require('./routes/dashboard')
var sessions = require('./routes/sessions')
var menu = require('./routes/menu')
var broadcasts = require('./routes/broadcasts')
var chat = require('./routes/sendChat')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(session({secret: '1234567890QWERTY'}))
app.use(session({
  cookieName: 'session',
  secret: '1234567890QWERTY',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}))
app.use('/', index)
app.use('/', userInformation)
app.use('/', pages)
app.use('/', surveys)
app.use('/', workflows)
app.use('/', autoPosting)
app.use('/', polls)
app.use('/', subscribers)
app.use('/', dashboard)
app.use('/', sessions)
app.use('/', menu)
app.use('/', broadcasts)
app.use('/', chat)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
