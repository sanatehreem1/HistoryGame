const { Router } = require('express');

const storyController = require('../controller/stories');
const authenticator = require('../middleware/authenticator');
const storyRouter = Router();

storyRouter.get('/', authenticator, storyController.getStories);
storyRouter.get('/:id', storyController.getStoryByID);

module.exports = storyRouter;