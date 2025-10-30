const express = require('express')
const routes = express.Router()
const {addingWorker,searchingUser,upadteUser} = require('../controller/stallsContoller')

routes.post('/stalls',addingWorker)
routes.get('/stalls',searchingUser)
routes.put('/stalls',upadteUser)

module.exports = routes 