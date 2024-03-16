const express = require('express')
const app = express()
const dotenv = require('dotenv')
const router = require('./router/router')
const errorHandler = require('./middleware/errorHandler')
dotenv.config()

const port = process.env.APP_PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(router)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`app running in port ${port}`)
})