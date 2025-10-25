const express = require('express')
const router = express.Router()
const {addTicket} = require('../controller/ticketController')

router.post('/tickets',addTicket)

module.exports = router