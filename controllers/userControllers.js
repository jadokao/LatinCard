const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
	findUser: async id => {
		const result = await User.findOne({
			raw: true,
			nest: true,
			where: { id },
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
	},
	signIn: async (account, password) => {
		if (!account || !password) throw new Error('請完整填寫')
		// 1. 透過 account 找到相對應的 user
		const user = await User.findOne({ where: { account: account } })
		if (!user) throw new Error('帳號尚未註冊')

		// 2. 將傳進來的 password 與資料庫存的 user.password 做比對
		const passwordIsValid = await bcrypt.compare(password, user.password)
		if (!passwordIsValid) throw new Error('密碼輸入錯誤')

		// 3. 成功則簽發 回傳 token
		const payload = { id: user.id }
		const token = await jwt.sign(payload, process.env.JWT_SECRET)

		return { token }
	}
}

module.exports = userController
