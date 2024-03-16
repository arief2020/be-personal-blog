const express = require("express");

const router = express.Router();

const path = require("path");
const swaggerRouter = require('../swagger')
const movieRouter = require('./movieRouter')
const userRouter = require('./userRouter')
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const { authentication } = require("../middleware/authHandler");

router.use("/api/images", express.static(path.join(__dirname, "../uploads")))
router.use('/', swaggerRouter)
router.use('/api/auth', authRouter)
router.use(authentication)
router.use('/api/profile', profileRouter )
router.use('/api/movies', movieRouter)
router.use('/api/users', userRouter)

module.exports = router;