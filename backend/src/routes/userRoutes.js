const express = require('express')
const router = express.Router();
const {registerUser,loginUser,updateUserById, getUser, deleteUser} = require('../controller/userController')
const {authenticate, authorize} = require('../middlewre/auth')

// router.post('/user',authenticate, authorize(['volunteer', 'manager','admin']), registerUser)
router.post('/user',authenticate,registerUser)
router.post('/login',loginUser)
router.put('/user',updateUserById)
router.get('/user',getUser)
router.delete('/user', deleteUser)


module.exports = router;

