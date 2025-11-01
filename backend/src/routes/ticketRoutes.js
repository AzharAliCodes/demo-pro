const express = require('express')
const router = express.Router()
const {addTicket,updateUrl,viewTickets,viewAllTickets,viewTicketsUrl} = require('../controller/ticketController')
const {authenticate, authorize} = require('../middlewre/auth')

router.post('/tickets',authenticate,authorize(['volunteer', 'manager','admin']),addTicket)
router.put('/tickets',authenticate,authorize(['volunteer', 'manager','admin']),updateUrl)
router.get('/tickets',authenticate,authorize(['manager','admin']),viewTickets)
router.get('/atickets',authenticate, authorize(['admin']),viewAllTickets)
router.get('/utickets',authenticate, authorize(['manager','admin']),viewTicketsUrl)

module.exports = router

