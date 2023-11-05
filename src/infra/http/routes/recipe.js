const express = require('express');
const recipeRouter = express.Router();
const getRecipeByIngredientsController = require('./../../../modules/recipe/usecases/getRecipeByIngredients/index');
const {
  checkAuthentication,
} = require('../../../modules/authentication/middleware/AuthenticationMiddleware');

recipeRouter.use(checkAuthentication);

recipeRouter.get('/search', (req, res) => {
  getRecipeByIngredientsController.execute(req, res);
});

module.exports = recipeRouter;
