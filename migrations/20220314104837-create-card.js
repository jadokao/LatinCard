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
			chExplain: {
				type: Sequelize.STRING
			},
			chPartOfSpeech: {
				type: Sequelize.STRING
			},
			en: {
				type: Sequelize.STRING
			},
			enExplain: {
				type: Sequelize.STRING
			},
			enPartOfSpeech: {
				type: Sequelize.STRING
			},
			la: {
				type: Sequelize.STRING
			},
			laExplain: {
				type: Sequelize.STRING
			},
			laPartOfSpeech: {
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
