const express = require('express')
const router = express.Router();
const {registerUser,loginUser,updateUserById, getUser, deleteUser} = require('../controller/userController')

router.post('/user', registerUser)
router.post('/login',loginUser)
router.put('/user',updateUserById)
router.get('/user',getUser)
router.delete('/user', deleteUser)


module.exports = router;
