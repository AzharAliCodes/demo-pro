const express = require('express')
const router = express.Router()
const {addTicket,updateUrl,viewTickets} = require('../controller/ticketController')

router.post('/tickets',addTicket)
router.put('/tickets',updateUrl)
router.get('/tickets',viewTickets)

module.exports = router