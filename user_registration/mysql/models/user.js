const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../index');
const Address = require('./address');

class User extends Model {}

User.init({
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    get: function (value) {
      return value.toUpperCase()
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  bankCard: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cardExpirationDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  addressId: {
    type: Sequelize.INTEGER,
    references: {
      model: Address,
      key: 'id'
    }
  },
}, {
  sequelize,
  model: 'user',
  hooks: {
    beforeCreate(user, options) {
      if (user.age < 21) {
        throw new Error('User should be older then 21');
      }
    },
    beforeUpdate(user, options) {
      if (user.age < 21) {
        throw new Error('User should be older then 21');
      }
    }
  }
});

User.belongsTo(Address);

module.exports = User;