const express = require('express')
const router = express.Router();
const {registerUser,loginUser,updateUserById} = require('../controller/userController')

router.post('/user', registerUser)
router.post('/login',loginUser)
router.put('/user',updateUserById)


module.exports = router;
