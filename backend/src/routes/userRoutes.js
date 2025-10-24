const express = require('express')
const router = express.Router();
const registerUser = require('../controller/userController')

router.post('/user', registerUser)

module.exports = router;
