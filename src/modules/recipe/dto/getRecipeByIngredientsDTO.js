class GetRecipeByIngredientsRequestDTO {
  constructor(ingredients) {
    this.ingredients = ingredients;
  }
}

class GetRecipeByIngredientsResponseDTO {
  constructor(
    uri,
    recipeName,
    recipeImage,
    ingredients,
    cuisineType,
    mealType,
    calories,
    serving,
    sourceURL,
  ) {
    this.uri = uri;
    this.recipeName = recipeName;
    this.recipeImage = recipeImage;
    this.ingredients = ingredients;
    this.cuisineType = cuisineType;
    this.mealType = mealType;
    this.calories = calories;
    this.serving = serving;
    this.sourceURL = sourceURL;
  }
}

module.exports = { GetRecipeByIngredientsRequestDTO, GetRecipeByIngredientsResponseDTO };
