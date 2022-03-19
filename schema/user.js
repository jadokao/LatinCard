const { gql, ForbiddenError } = require('apollo-server')

// 1. GraphQL Schema 定義
const typeDefs = gql`
	extend type Query {
		me(account: String): User
	}

	type User {
		id: Int!
		name: String!
		account: String!
		password: String!
	}

	type Token {
		token: String!
	}

	extend type Mutation {
		signUp(name: String, account: String, password: String): User
		login(account: String!, password: String!): Token
	}
`

const userController = require('../controllers/userControllers')

// helper functions
const isAuthenticated = resolverFunc => (parent, args, context) => {
	if (!context.me) throw new ForbiddenError('請先登入')
	return resolverFunc.apply(null, [parent, args, context])
}

// 2. Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
	Query: {
		// 需注意名稱一定要對到 Schema 中 field 的名稱
		me: isAuthenticated((parent, args, { me }) => userController.findUser(me.id))
	},
	// Mutation Type Resolver
	Mutation: {
		// 需注意！args 打開後第一層為 input ，再進去一層才是 title, content
		signUp: async (parent, { name, account, password }, context) => {
			return userController.signUp(name, account, password)
		},
		login: async (root, { account, password }, context) => {
			return userController.signIn(account, password)
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}
