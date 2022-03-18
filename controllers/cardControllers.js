const { User, Card, Book } = require('../models')

const cardController = {
	postCard: async (input, id) => {
		const { ch, en, la, partOfSpeech } = input
		if (!ch || !en || !la || !partOfSpeech) throw new Error('請完整填寫')

		const result = await Card.create({ ch, en, la, partOfSpeech }).then(card => {
			return card.dataValues
		})
		await Book.create({ CardId: result.id, UserId: id })
		return result
	},
	editCard: async input => {
		const { chOrigin, enOrigin, laOrigin, partOfSpeechOrigin, ch, en, la, partOfSpeech } = input

		const card = await Card.findOne({
			where: { ch: chOrigin, en: enOrigin, la: laOrigin, partOfSpeech: partOfSpeechOrigin }
		})
		if (!card) throw new Error('找不到卡片')
		const newCard = await card.update({ ch, en, la, partOfSpeech })
		return newCard.dataValues
	},
	deleteCard: async (id, me) => {
		const isDeleted = await Card.destroy({ where: { id } })
		if (isDeleted === 0) throw new Error('卡片編號錯誤')
		await Book.destroy({ where: { UserId: me.id, CardId: id } })
		return Card.findAll({ raw: true, nest: true })
	}
}

module.exports = cardController
