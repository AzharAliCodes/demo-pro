const express = require('express')
const routes = express.Router()
const {addingWorker,searchingUser,upadteUser} = require('../controller/stallsContoller')
const {authenticate, authorize} = require('../middlewre/auth')

routes.post('/stalls',authenticate, authorize(['manager','admin']),addingWorker)
routes.get('/stalls',authenticate,authorize(['manager','admin']),searchingUser)
routes.put('/stalls',authenticate,authorize(['manager','admin']),upadteUser)

module.exports = routes 