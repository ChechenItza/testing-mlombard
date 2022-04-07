const { createClient } = require('redis')
const { UnauthorizedError } = require('../errors')
const log = require('../utils/logger')

let client
(async () => {
  client = createClient()
  client.on('error', (err) => log.error('Redis Client Error', err))
  try {
    await client.connect()
  } catch(err) {
    log.error(err)
    process.exit(1)
  }
})()

async function create(uuid, userId, exp) {
  return await client.set(uuid, userId, {
    EX: exp
  })
}

async function find(uuid) {
  const userId = await client.get(uuid)
  if (userId === null)
    throw new UnauthorizedError('token')

  return userId
}

async function remove(uuid) {
  const userId = await find(uuid)

  const count = await client.del(uuid)
  if (count === 0) 
    throw new UnauthorizedError('token')
  
  return userId
}

module.exports = {
  create,
  find,
  remove
}