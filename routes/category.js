const express = require('express');
const router = express.Router()
const { create, list, read, remove } = require('../controllers/category');
//validators
const { runValidation } = require('../validators/index');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddlewear } = require('../controllers/auth');


router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddlewear, create);
router.get('/categories', list)
router.get('/categories/:slug', read)
router.delete('/categories/:slug', requireSignin, adminMiddlewear, remove)

module.exports = router;