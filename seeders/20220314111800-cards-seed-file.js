'use strict'

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Cards',
			[
				{
					ch: '我愛',
					en: 'love',
					la: 'amo',
					partOfSpeech: '動詞',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					ch: '女孩',
					en: 'girl',
					la: 'puella',
					partOfSpeech: '名詞',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					ch: '是',
					en: 'to be',
					la: 'est',
					partOfSpeech: '動詞',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		)
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Cards', null, {})
	}
}
