const Recipe = require('../entities/recipe');
const { GetRecipeByIngredientsResponseDTO } = require('./../dto/getRecipeByIngredientsDTO');

class RecipeMap {
  constructor() {}

  static toDomain(recipes) {
    const allDomainRecipe = recipes.map((recipe) => {
      return new Recipe(
        recipe.recipe.uri,
        recipe.recipe.label,
        recipe.recipe.image,
        recipe.recipe.ingredients.map(({ text, image }) => ({ text, image })),
        recipe.recipe.cuisineType,
        recipe.recipe.mealType,
        recipe.recipe.calories,
        recipe.recipe.yield,
        recipe.recipe.url,
      );
    });
    return allDomainRecipe;
  }

  static toGetRecipeByIngredientsResponseDTO(mappedRecipes) {
    const response = mappedRecipes.map((recipe) => {
      return new GetRecipeByIngredientsResponseDTO(
        recipe.uri,
        recipe.recipeName,
        recipe.recipeImage,
        recipe.ingredients,
        recipe.cuisineType,
        recipe.mealType,
        recipe.calories,
        recipe.serving,
        recipe.sourceURL,
      );
    });
    return response;
  }
}

module.exports = RecipeMap;
