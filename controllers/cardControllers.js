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
	}
}

module.exports = cardController
