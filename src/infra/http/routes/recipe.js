const express = require('express');
const recipeRouter = express.Router();
const getRecipeByIngredientsController = require('./../../../modules/recipe/usecases/getRecipeByIngredients/index');
const {
  checkAuthentication,
} = require('./../../../modules/authentication/services/AuthenticationService');

recipeRouter.use(checkAuthentication);

recipeRouter.post('/search', async (req, res) => {
  getRecipeByIngredientsController.execute(req, res);
});

module.exports = recipeRouter;
