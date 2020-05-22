const express = require('express');
const router = express.Router()
const { create } = require('../controllers/category');
//validators
const { runValidation } = require('../validators/index');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddlewear } = require('../controllers/auth');


router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddlewear, create);


module.exports = router;