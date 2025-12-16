const { Router } = require('express');

const charController = require('../controller/characters');
const charRouter = Router();

charRouter.get('/', charController.index)
charRouter.get('/:id', charController.show)

module.exports = charRouter;