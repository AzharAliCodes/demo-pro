const express = require('express')
const router = express.Router()
const {addTicket,updateUrl,viewTickets,viewAllTickets,viewTicketsUrl} = require('../controller/ticketController')
const {authenticate} = require('../middlewre/auth')

router.post('/tickets',authenticate,addTicket)
router.put('/tickets',authenticate,updateUrl)
router.get('/tickets',authenticate,viewTickets)
router.get('/atickets',authenticate, viewAllTickets)
router.get('/utickets',authenticate, viewTicketsUrl)

module.exports = router

