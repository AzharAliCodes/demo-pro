const express = require('express')
const router = express.Router();
const {registerUser,loginUser,updateUserById, deleteUser, searchUser} = require('../controller/userController')
const {authenticate, authorize} = require('../middleware/auth')

router.post('/user',authenticate, authorize(['volunteer', 'manager','admin']), registerUser)
router.post('/login',loginUser)
router.put('/user', authenticate,authorize(['manager','admin']),updateUserById)
router.delete('/user', authenticate,authorize(['manager','admin']), deleteUser)
router.get('/users/search', authenticate, authorize(['manager', 'admin']), searchUser)


module.exports = router;

