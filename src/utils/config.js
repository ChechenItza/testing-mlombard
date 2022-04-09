const path = require('path')
process.env.NODE_ENV === 'production' ? 
  require('dotenv').config() : 
  require('dotenv').config({ 
    path: path.resolve(process.cwd(), '.env.dev'),
    debug: true
  })

const PORT = process.env.PORT ?? 3000
const MEDIA_ROOT = process.env.MEDIA_ROOT ?? 'media'

//mongo
const MONGO_USER = process.env.MONGO_INITDB_ROOT_USERNAME ?? 'root'
const MONGO_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD ?? 'example'
const MONGO_HOST = process.env.MONGO_HOST ?? 'localhost'
const MONGO_PORT = process.env.MONGO_PORT ?? '27017'

//redis
const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost'
const REDIS_PORT = process.env.REDIS_PORT ?? '6379'

//JWT
if (!process.env.JWT_SECRET) {
  throw Error('JWT_SECRET undefined')
} 
const JWT_SECRET = process.env.JWT_SECRET
const ACCES_EXP = Number(process.env.ACCESS_EXP) ? Number(process.env.ACCESS_EXP) : 7200 //2 hours 
const REFRESH_EXP = Number(process.env.REFRESH_EXP) ? Number(process.env.REFRESH_EXP) : 604800 //7 days


module.exports = {
  PORT,
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  REDIS_HOST,
  REDIS_PORT,
  JWT_SECRET,
  ACCES_EXP,
  REFRESH_EXP,
  MEDIA_ROOT
}