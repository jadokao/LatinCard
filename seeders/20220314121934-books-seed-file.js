'use strict'

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Books',
			[
				{
					id: 1,
					UserId: 1,
					CardId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: 2,
					UserId: 2,
					CardId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: 3,
					UserId: 3,
					CardId: 3,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: 4,
					UserId: 1,
					CardId: 3,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		)
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Books', null, {})
	}
}
