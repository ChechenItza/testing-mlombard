const { PORT, MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT } = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger');

(async () => {
  try { 
    await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`)
  } catch(err) {
    logger.error(err)
    process.exit(1)
  }
  
  logger.log('connected to db')
})()

app.use(express.json())

require('./routes')(app)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})