const userRouter = require('express').Router();
const userController = require('./../controllers.js/userController');

userRouter.route('/').get(userController.getUser);

module.exports = userRouter;
