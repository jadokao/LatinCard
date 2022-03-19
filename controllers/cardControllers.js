const { User, Card, Book } = require('../models')

const cardController = {
	findOneCard: async (input, me) => {
		const { id, ch, en, la, CardId } = input

		if (CardId) return Card.findOne({ where: { id: CardId } })

		if (id) {
			return Card.findOne({
				raw: true,
				nest: true,
				where: { id }
			})
		}
		let result = {}
		if (ch) {
			const cards = await Card.findAll({
				raw: true,
				nest: true,
				where: { ch },
				include: [{ model: User, as: 'CardBelongUsers' }]
			})
			result = cards.filter(card => card.CardBelongUsers.id === me.id)
		} else if (en) {
			const cards = await Card.findAll({
				raw: true,
				nest: true,
				where: { en },
				include: [{ model: User, as: 'CardBelongUsers' }]
			})
			result = cards.filter(card => card.CardBelongUsers.id === me.id)
		} else if (la) {
			const cards = await Card.findAll({
				raw: true,
				nest: true,
				where: { la },
				include: [{ model: User, as: 'CardBelongUsers' }]
			})
			result = cards.filter(card => card.CardBelongUsers.id === me.id)
		}
		return result[0]
	},
	findCards: async me => {
		const cards = await Card.findAll({ raw: true, nest: true, include: [{ model: User, as: 'CardBelongUsers' }] })
		return cards.filter(card => card.CardBelongUsers.id === me.id)
	},
	findCardFromBook: async id => {
		return Book.findAll({ raw: true, nest: true })
	},
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
		const checkCard = await Card.findOne({ raw: true, nest: true, where: { id } })
		if (!checkCard) throw new Error('卡片編號錯誤')

		const isDeletedBook = await Book.destroy({ where: { UserId: me.id, CardId: id } })
		if (isDeletedBook === 0) throw new Error('不屬於該使用者的卡片')
		await Card.destroy({ where: { id } })

		return Card.findAll({ raw: true, nest: true })
	}
}

module.exports = cardController
