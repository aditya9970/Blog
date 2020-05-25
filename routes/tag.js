const express = require('express');
const router = express.Router();


//validators
const { runValidation } = require('../validators/index');
const { tagCreateValidator } = require('../validators/tag');
const { requireSignin, adminMiddlewear } = require('../controllers/auth');
const { create, list, read, remove } = require('./../controllers/tag');


router.post('/tags', tagCreateValidator, runValidation, requireSignin, adminMiddlewear, create);
router.get('/tags', list);
router.get('/tags/:slug', read);
router.delete('/tags/:slug', remove);

module.exports = router;