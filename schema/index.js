const { gql, ForbiddenError } = require('apollo-server')

// 1. GraphQL Schema 定義
const typeDefs = gql`
  type Query {
		me(account: String): User
		books: [Book]
		card(id: Int, la: String, en: String, ch: String): Card

		"""
		find cards belong to user id
		"""
		cards: [Card]		
  }

	type User {
		id: Int!
		name: String!
		account: String!
		password: String!
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

	type Token {
		token: String!
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

	type Mutation {
		signUp(name: String, account: String, password: String): User
		login (account: String!, password: String!): Token
    "新增Card"
    postCard(input: PostCardInput!): Card
    "編輯Card"
    editCard(input: EditCardInput!): Card
		"刪除Card"
		deleteCard(id: Int!): [Card]
  }
`

const userController = require('../controllers/userControllers')
const cardController = require('../controllers/cardControllers')

// helper functions
const isAuthenticated = resolverFunc => (parent, args, context) => {
	if (!context.me) throw new ForbiddenError('請先登入')
	return resolverFunc.apply(null, [parent, args, context])
}

// 2. Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
	Query: {
		// 需注意名稱一定要對到 Schema 中 field 的名稱
		me: isAuthenticated((parent, args, { me }) => userController.findUser(me.id)),
		// find cards belong to specific user by user id
		cards: isAuthenticated((root, args, { me }) => {
			return cardController.findCards(me)
		}),
		card: isAuthenticated((root, input, { me }) => {
			return cardController.findOneCard(input, me)
		}),
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
	},
	// Mutation Type Resolver
	Mutation: {
		// 需注意！args 打開後第一層為 input ，再進去一層才是 title, content
		signUp: async (parent, { name, account, password }, context) => {
			return userController.signUp(name, account, password)
		},
		login: async (root, { account, password }, context) => {
			return userController.signIn(account, password)
		},
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
