const express = require('express')
const router = express.Router();
const {registerUser,loginUser,updateUserById, getUser, deleteUser} = require('../controller/userController')
const {authenticate, authorize} = require('../middleware/auth')

router.post('/user',authenticate, authorize(['volunteer', 'manager','admin']), registerUser)
router.post('/login',loginUser)
router.put('/user', authenticate,authorize(['manager','admin']),updateUserById)
router.get('/user', authenticate,authorize(['manager','admin']), getUser)
router.delete('/user', authenticate,authorize(['manager','admin']), deleteUser)


module.exports = router;

