const express = require('express')
const routes = express.Router()
const {scanEntery, scanExit} = require('../controller/scanController')

routes.post('/scan',scanEntery)
routes.get('/scan',scanExit)

module.exports = routes