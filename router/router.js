const express = require("express");

const router = express.Router();

const swaggerRouter = require('../swagger')
router.use('/', swaggerRouter)

module.exports = router;
