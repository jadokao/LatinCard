const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const db = require('../models')
const User = db.User

// serialize and deserialize user
passport.serializeUser((user, cb) => {
	cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
	User.findByPk(id, {
		include: [{ model: Card, as: 'UserHavingCards' }]
	}).then(user => {
		user = user.toJSON()
		return cb(null, user)
	})
})

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	User.findByPk(jwt_payload.id, {
		include: [{ model: Card, as: 'UserHavingCards' }]
	}).then(user => {
		if (!user) return next(null, false)
		return next(null, user)
	})
})
passport.use(strategy)

module.exports = passport
