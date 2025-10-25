const express = require('express')
const router = express.Router()
const {addTicket,updateUrl,viewTickets,viewAllTickets} = require('../controller/ticketController')

router.post('/tickets',addTicket)
router.put('/tickets',updateUrl)
router.get('/tickets',viewTickets)
router.get('/atickets', viewAllTickets)

module.exports = router