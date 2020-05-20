const express = require('express');
const router = express.Router()
const { signup } = require('../controllers/auth');

//validators
const { runValidation } = require('../validators/index');
const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signup);

module.exports = router