const express = require('express')
const router = express.Router();
const misc = require('../controllers/misc')

router.route('/')
    .get((misc.renderSettings))

module.exports = router;
