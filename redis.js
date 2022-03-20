const redis = require('redis')
const redisClient = redis.createClient({
	url: 'redis://redis:6379',
	host: 'redis-server',
	port: 6379
})

redisClient.on('connect', () => console.log('Connected to Redis!'))
redisClient.on('error', err => console.log('Redis Client Error', err))
redisClient.connect()

module.exports = redisClient
