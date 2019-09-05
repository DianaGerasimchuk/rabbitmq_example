const routes = require('express').Router();
const registerService = require('../services/register');
const { publishUserFlightMessage } = require('../synchronizer/producers/register');

routes.post('',  (req, res) => {
  registerService.registerUserOnFligh(req.body, (erorr, result) => {
    if (erorr) {
      return res.send({
        erorr
      });
    }
    //publishUserFlightMessage(result);
    return res.send({
      result
    });
  });
 
});

module.exports = routes;