const express = require('express')
const router = express.Router()
const {addTicket,updateUrl} = require('../controller/ticketController')

router.post('/tickets',addTicket)
router.put('/tickets',updateUrl)

module.exports = router