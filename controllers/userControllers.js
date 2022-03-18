const { User, Card } = require('../models')

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
	}
}

module.exports = userController
