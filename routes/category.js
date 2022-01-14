const express = require('express');
const router = express.Router();
const {authenticateJWT} = require('../middleware/authenticator');
const categoryController = require('../controllers/category');

router.post('/',authenticateJWT,categoryController.create);
router.get('/',authenticateJWT,categoryController.readAll);

module.exports = router;
