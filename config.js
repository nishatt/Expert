require('dotenv').config()
module.exports = {
  MONGO_DB: process.env.MONGO_DB,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST
}