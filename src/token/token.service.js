const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const tokenStorage = require('./token.storage')
const { JWT_SECRET, ACCES_EXP, REFRESH_EXP } = require('../utils/config')

async function genTokenPair(userId, role) {
  const accessToken = await genToken(userId, role, ACCES_EXP)
  const refreshToken = await genToken(userId, role, REFRESH_EXP)
  
  return { accessToken, refreshToken }
}

async function genToken(userId, role, exp) {
  const uuid = uuidv4()
  const token = jwt.sign({ //TODO: change to async version
    exp: Math.floor(Date.now() / 1000) + exp,
    uuid,
    role
  }, JWT_SECRET)
  await tokenStorage.create(uuid, userId, exp)

  return token
}

async function refresh(uuid) {
  const userId = await tokenStorage.remove(uuid) 
  return genTokenPair(userId)
}

async function getUserId(uuid) {
  return tokenStorage.find(uuid) 
}


module.exports = {
  genTokenPair,
  refresh,
  getUserId
}