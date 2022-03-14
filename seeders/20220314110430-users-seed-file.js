'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
					account: 'root',
					name: 'root',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
					account: 'user1',
					name: 'user1',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
					account: 'user2',
					name: 'user2',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		)
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {})
	}
}
