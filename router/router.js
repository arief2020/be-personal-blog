const express = require("express");

const router = express.Router();

const swaggerRouter = require('../swagger')
const movieRouter = require('./movieRouter')
const userRouter = require('./userRouter')

router.use('/', swaggerRouter)
router.use('/api/movies', movieRouter)
router.use('/api/users', userRouter)

module.exports = router;
