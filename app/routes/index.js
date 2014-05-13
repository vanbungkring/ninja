var express = require('express');
var router = express.Router();
var controller = require('../controller/main')
/* GET home page. */
router.get('/', controller.main);
module.exports = router;