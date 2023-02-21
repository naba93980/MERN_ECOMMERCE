const express = require('express')
const app = express()
const errorHandler = require("./middleware/handleError")

app.use(express.json())

// import routes
const product = require('./routes/productRoute');

app.use("/api/v1",product);

app.use(errorHandler)

module.exports=app