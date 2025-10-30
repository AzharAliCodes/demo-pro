const express = require('express')
const routes = express.Router()
const {addingWorker,searchingUser} = require('../controller/stallsContoller')

routes.post('/stalls',addingWorker)
routes.get('/stalls',searchingUser)

module.exports = routes 