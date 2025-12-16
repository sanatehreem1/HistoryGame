const { Router } = require('express');

const storyController = require('../controller/stories');
const storyRouter = Router();

storyRouter.get('/', storyController.getStories);
storyRouter.get('/:id', storyController.getStoryByID);

module.exports = storyRouter;