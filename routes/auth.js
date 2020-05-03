const express = require('express')
const router = express.Router();
const {getUsers,Login,Register} = require('./../controllers/authController');

router.post('/login',Login)
router.post('/register',Register)
router.get('/users',getUsers)

module.exports = router;





