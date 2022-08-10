var express = require('express');
var router = express.Router();
var test_controller = require("../controllers/testController");

router.get('/', test_controller.artist_list);

module.exports = router;