const routes = require('express').Router();
const userService = require('../services/users');

routes.get('/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.send({
    user
  });
});

routes.get('/', async (req, res) => {
  const nameQuery = req.query.name;
  const users = await userService.getUsersByName(nameQuery);
  res.send({
    users
  });
});

module.exports = routes;