const { gql } = require('apollo-server')

const userSchema = require('./user')
const cardSchema = require('./card')
const bookSchema = require('./book')

// 1. GraphQL Schema 定義
const typeDefs = gql`
  type Query {
    "測試用 Hello World"
    hello: String
  }

  type Mutation {
    test: Boolean
  }
`

// 2. Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
	Query: {
		hello: () => 'world'
	},
	Mutation: {
		test: () => 'test'
	}
}

module.exports = {
	typeDefs: [typeDefs, userSchema.typeDefs, cardSchema.typeDefs, bookSchema.typeDefs],
	resolvers: [resolvers, userSchema.resolvers, cardSchema.resolvers, bookSchema.resolvers]
}
