const express = require('express');
const router = express.Router()
const { requireSignin, authMiddlewear } = require('../controllers/auth');
const { read } = require('../controllers/user');


router.get('/profile', requireSignin, authMiddlewear, read);


module.exports = router