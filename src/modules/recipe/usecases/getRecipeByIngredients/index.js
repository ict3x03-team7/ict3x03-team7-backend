const EdamamRecipeService = require('./../../services/EdamamRecipeService');
const GetRecipeByIngredients = require('./getRecipeByIngredients.js');
const GetRecipeByIngredientsController = require('./getRecipeByIngredientsController.js');
const dotenv = require('dotenv');
dotenv.config();

const edamamRecipeService = new EdamamRecipeService(
  process.env.EDAMAM_APP_ID,
  process.env.EDAMAM_APP_KEY,
);

const getRecipeByIngredients = new GetRecipeByIngredients(edamamRecipeService);

const getRecipeByIngredientsController = new GetRecipeByIngredientsController(
  getRecipeByIngredients,
);

module.exports = getRecipeByIngredientsController;
