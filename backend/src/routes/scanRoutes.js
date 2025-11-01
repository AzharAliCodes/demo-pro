const express = require('express')
const routes = express.Router()
const {scanEntery, scanExit} = require('../controller/scanController')
const {authenticate, authorize} = require('../middlewre/auth')

routes.post('/scan',authenticate, authorize(['volunteer', 'manager','admin']),scanEntery)
routes.get('/scan', authenticate, authorize(['volunteer', 'manager','admin']),scanExit)

module.exports = routes
