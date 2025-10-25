const express = require('express')
const router = express.Router()
const {addTicket,updateUrl,viewTickets,viewAllTickets,viewTicketsUrl} = require('../controller/ticketController')

router.post('/tickets',addTicket)
router.put('/tickets',updateUrl)
router.get('/tickets',viewTickets)
router.get('/atickets', viewAllTickets)
router.get('/utickets', viewTicketsUrl)

module.exports = router