const express = require('express')
const router = express.Router()
const swaggerDocument = require('./docs/swagger-exp.json');
const swaggerUi = require('swagger-ui-express')

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = router;