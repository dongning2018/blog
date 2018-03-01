const express = require('express')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const api = require('./api')

const app = express()
app.set('port', process.env.port || 5500)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(api)

app.listen(app.get('port'), function() {
  console.log('Server up: http://localhost:' + app.get('port'))
})
