const { Router } = require('express');

const userController = require('../controller/users');
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;