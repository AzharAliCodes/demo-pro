const express = require('express')
const router = express.Router();
const {registerUser,loginUser,updateUserById, getUser} = require('../controller/userController')

router.post('/user', registerUser)
router.post('/login',loginUser)
router.put('/user',updateUserById)
router.get('/user',getUser)


module.exports = router;
