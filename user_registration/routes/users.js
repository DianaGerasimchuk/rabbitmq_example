const routes = require('express').Router();
const userService = require('../services/users');
const {
  publishNewUserMessage,
  publishUpdateUserMessage
} = require('../synchronizer/producers/users');

routes.get('/', async (req, res) => {
  const users = await userService.getUsers();
  res.send({
    users
  });
});

routes.get('/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.send({
    user
  });
});

routes.put('/:id', (req, res) => {
  userService.updateUser(req.params.id, req.body.user, req.body.address, (error, result) => {
    if (error) {
      return res.status(500).send({
        message: error.message
      });
    }
    // publishUpdateUserMessage({
    //     id: req.params.id,
    //     ...req.body.user,
    //     Address: {
    //       ...req.body.address
    //     }
    // });
    return res.send({
      result
    });
  });
});

routes.post('/', (req, res) => {
  userService.createUser(req.body.user, req.body.address, (error, user) => {
    if (error) {
      return res.status(500).send({
        message: error.message
      });
    }
   // publishNewUserMessage(user);
    return res.send({
      user
    });
  });
});


module.exports = routes;