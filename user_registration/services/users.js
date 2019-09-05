const User = require('../mysql/models/user');
const Address = require('../mysql/models/address');
const sequelize = require('../mysql/index');

createUser = (user, address, cb) => {
  return sequelize.transaction(t => {
    return User.create({
      ...user,
      Address: {
        ...address
      }
    }, {
      include: [Address],
      transaction: t
    });
  }).then(newUser => {
    cb(null, newUser);
  }).catch(error => {
    cb(error, null);
  });
}

updateUser = async (userId, user, address, cb) => {

  const userToUpdate = await User.findByPk(userId);

  return sequelize.transaction(t => {
    return User.update({
      ...user,
    }, {
      where: {
        id: userId
      },
      transaction: t
    }).then(result => {
      return Address.update({
        ...address,
      }, {
        where: {
          id: userToUpdate.addressId
        },
        transaction: t
      });
    });
  }).then(result => {
    cb(null, result);
  }).catch(error => {
    cb(error, null);
  });
}

getUsers = async () => {
  return await User.findAll({
    include: [Address]
  });
}

getUserById = async (userId) => {
  return await User.findByPk(userId, {
    include: [Address]
  });
}

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUserById
}