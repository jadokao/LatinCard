const { gql, ForbiddenError } = require('apollo-server')

// 1. GraphQL Schema 定義
const typeDefs = gql`
  extend type Query {
    hello_Card: String
		card(id: Int, la: String, en: String, ch: String): Card

		"""
		find cards belong to user id
		"""
		cards: [Card]		
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

	
	input PostCardInput{
		ch: String!
		en: String!
		la: String!
		partOfSpeech: String!
	}

	input EditCardInput{
		chOrigin: String!
		enOrigin: String!
		laOrigin: String!
		partOfSpeechOrigin: String!
		ch: String!
		en: String!
		la: String!
		partOfSpeech: String!
	}

	extend type Mutation {
    "新增Card"
    postCard(input: PostCardInput!): Card
    "編輯Card"
    editCard(input: EditCardInput!): Card
		"刪除Card"
		deleteCard(id: Int!): [Card]
  }
`

const cardController = require('../controllers/cardControllers')

// helper functions
const isAuthenticated = resolverFunc => (parent, args, context) => {
	if (!context.me) throw new ForbiddenError('請先登入')
	return resolverFunc.apply(null, [parent, args, context])
}

// 2. Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
	Query: {
		hello_Card: () => 'Hi Card Test',
		cards: isAuthenticated((root, args, { me }) => {
			return cardController.findCards(me)
		}),
		card: isAuthenticated((root, input, { me }) => {
			return cardController.findOneCard(input, me)
		})
	},
	// Mutation Type Resolver
	Mutation: {
		postCard: isAuthenticated((parent, { input }, { me }) => {
			return cardController.postCard(input, me.id)
		}),
		editCard: isAuthenticated((parent, { input }, { me }) => {
			return cardController.editCard(input)
		}),
		deleteCard: isAuthenticated((parent, { id }, { me }) => {
			return cardController.deleteCard(id, me)
		})
	}
}

module.exports = {
	typeDefs,
	resolvers
}
