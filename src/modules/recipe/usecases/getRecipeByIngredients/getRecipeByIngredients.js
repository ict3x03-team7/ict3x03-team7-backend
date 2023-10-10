const RecipeMap = require('./../../mapper/recipeMap');

class GetRecipeByIngredients {
  constructor(recipeService) {
    this.RecipeService = recipeService;
  }

  async execute(input) {
    let recipeResult;
    try {
      recipeResult = await this.RecipeService.recipeSearchByIngredient(input.ingredients);
      //   console.log(recipeResult[0]);
      if (!recipeResult) {
        return new Error('Server/Database is down');
      }
      const responseDTO = RecipeMap.toGetRecipeByIngredientsResponseDTO(recipeResult);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = GetRecipeByIngredients;
