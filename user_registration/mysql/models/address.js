const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../index');

class Address extends Model {}

Address.init({
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postcode: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  model: 'address'
});

module.exports = Address;