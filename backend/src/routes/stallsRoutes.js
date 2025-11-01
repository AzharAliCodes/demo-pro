const express = require('express')
const routes = express.Router()
const {addingWorker,searchingUser,upadteUser} = require('../controller/stallsContoller')
const {authenticate} = require('../middlewre/auth')

routes.post('/stalls',authenticate,addingWorker)
routes.get('/stalls',authenticate,searchingUser)
routes.put('/stalls',authenticate,upadteUser)

module.exports = routes 