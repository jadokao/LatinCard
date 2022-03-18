'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Card extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate (models) {
			Card.belongsToMany(models.User, {
				through: models.Book,
				foreignKey: 'CardId',
				as: 'CardBelongUsers'
			})
		}
	}
	Card.init(
		{
			ch: DataTypes.STRING,
			en: DataTypes.STRING,
			la: DataTypes.STRING,
			partOfSpeech: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Card'
		}
	)
	return Card
}
