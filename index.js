const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./router')
const config = require('./config')

mongoose
  .connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}${config.MONGO_HOST}/${config.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected successfully"))
  .catch(error => console.log(error));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', route)

app.listen(3000, () => {
  console.log("app is listening 3000")
})

