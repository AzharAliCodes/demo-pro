const express = require('express')
const routes = express.Router()
const {addingWorker} = require('../controller/stallsContoller')

routes.post('/stalls',addingWorker)

module.exports = routes 