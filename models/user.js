'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate (models) {
			User.belongsToMany(models.Card, {
				through: models.Book,
				foreignKey: 'UserId',
				as: 'UserHavingCards'
			})
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			account: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'User'
		}
	)
	return User
}
