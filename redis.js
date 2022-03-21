const redis = require('redis')
const redisClient = redis.createClient({
	url: process.env.REDIS_URL || '',
	host: process.env.REDIS_HOST || '',
	port: 6379
})

redisClient.on('connect', () => console.log('Connected to Redis!'))
redisClient.on('error', err => console.log('Redis Client Error', err))
redisClient.connect()

module.exports = redisClient
