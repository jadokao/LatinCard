'use strict'

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Cards',
			[
				{
					ch: '我愛',
					chExplain: '愛',
					chPartOfSpeech: '動詞',
					en: 'love',
					enExplain: 'love',
					enPartOfSpeech: 'verb',
					la: 'amo',
					laExplain: 'love',
					laPartOfSpeech: 'verb',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					ch: '女孩',
					chExplain: '女性的未成年孩童',
					chPartOfSpeech: '名詞',
					en: 'girl',
					enExplain: 'a child who is female',
					enPartOfSpeech: 'noun',
					la: 'puella',
					laExplain: 'girl',
					laPartOfSpeech: 'noun',
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
