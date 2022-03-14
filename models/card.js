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
			chExplain: DataTypes.STRING,
			chPartOfSpeech: DataTypes.STRING,
			en: DataTypes.STRING,
			enExplain: DataTypes.STRING,
			enPartOfSpeech: DataTypes.STRING,
			la: DataTypes.STRING,
			laExplain: DataTypes.STRING,
			laPartOfSpeech: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Card'
		}
	)
	return Card
}
