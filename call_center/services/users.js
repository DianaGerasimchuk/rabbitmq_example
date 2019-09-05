const User = require('../mongo/models/user');

getUserById = async (userId) => {
  return await User.findById(userId).populate('flights.flightRef');
}

getUsersByName = async (nameFilter) => {
  const filter = nameFilter ? {
    fullName: {
      $regex: `^${nameFilter}$`
    }
  } : {};
  return await User.find(filter);
}

createUser = async () => {

}

module.exports = {
  getUserById,
  getUsersByName,
  createUser
}