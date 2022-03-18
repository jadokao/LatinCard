const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
	findUser: async account => {
		const result = await User.findOne({
			raw: true,
			nest: true,
			where: { account: account },
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		}).then(user => {
			return user
		})
		return result
	},
	signUp: async (name, account, password) => {
		if (!name || !account || !password) throw new Error('請完整填寫')
		const result = await User.findOne({ where: { account: account } }).then(user => {
			if (!user) {
				// account找不到 >> 還沒註冊過
				return User.create({
					account: account,
					name: name,
					password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
				})
					.then(user => {
						return user
					})
					.catch(err => console.log(err))
			}
			throw new Error('已經重複註冊')
		})
		return result.dataValues
	}
}

module.exports = userController
