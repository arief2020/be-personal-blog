const express = require("express");

const router = express.Router();

const swaggerRouter = require('../swagger')
const movieRouter = require('./movieRouter')
router.use('/', swaggerRouter)
router.use('/api/movies', movieRouter)

module.exports = router;
