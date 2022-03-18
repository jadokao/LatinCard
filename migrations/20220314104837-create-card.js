'use strict'
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('Cards', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			ch: {
				type: Sequelize.STRING
			},
			en: {
				type: Sequelize.STRING
			},
			la: {
				type: Sequelize.STRING
			},
			partOfSpeech: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('Cards')
	}
}
