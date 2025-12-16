const { Router } = require('express');

const charController = require('../controller/characters');
const charRouter = Router();

charRouter.get('/', charController.index)
charRouter.get('/char/:id', charController.show)
charRouter.get('/story/:id', charController.getStory)

module.exports = charRouter;