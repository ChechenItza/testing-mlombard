const { PORT, MONGO_CONN_URL, MEDIA_ROOT } = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger');

(async () => {
  try { 
    await mongoose.connect(MONGO_CONN_URL)
  } catch(err) {
    logger.error(err)
    process.exit(1)
  }
  
  logger.log('connected to db')
})()

app.use(express.json())
app.use(`/${MEDIA_ROOT}`, express.static(MEDIA_ROOT))

require('./routes')(app)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})