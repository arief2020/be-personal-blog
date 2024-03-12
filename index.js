const express = require('express')
const app = express()
const dotenv = require('dotenv')
const router = require('./router/router')
dotenv.config()

const port = process.env.APP_PORT || 5000
app.use(router)

app.listen(port, ()=>{
    console.log(`app running in port ${port}`)
})