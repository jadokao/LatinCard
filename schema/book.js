const { gql } = require('apollo-server')

// 1. GraphQL Schema 定義
const typeDefs = gql`
	extend type Query {
		books: [Book]
	}

	type Card {
		id: Int!
		ch: String
		chExplain: String
		en: String
		enExplain: String
		la: String
		laExplain: String
		partOfSpeech: String
	}

	type Book {
		UserId: Int
		CardId: Int
		card: Card
	}
`

const cardController = require('../controllers/cardControllers')

// 2. Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
	Query: {
		// This is parent for Book.card
		books: (root, args, context) => {
			return cardController.findCardFromBook()
		}
	},
	Book: {
		// take cards from specific book data
		card: (parent, args, context) => {
			return cardController.findOneCard(parent, context)
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}
