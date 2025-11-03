const express = require('express')
const router = express.Router()
const {addTicket,viewTickets,viewAllTickets,viewTicketsUrl} = require('../controller/ticketController')
const {authenticate, authorize} = require('../middleware/auth')

router.post('/tickets',authenticate,authorize(['volunteer', 'manager','admin']),addTicket)
router.get('/tickets',authenticate,authorize(['volunteer','manager','admin']),viewTickets)
router.get('/atickets',authenticate, authorize(['admin']),viewAllTickets)
router.get('/utickets',authenticate, authorize(['manager','admin']),viewTicketsUrl)

module.exports = router

