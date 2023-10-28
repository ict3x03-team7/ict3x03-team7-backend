const axios = require('axios');
const RecipeMap = require('./../mapper/recipeMap');
const IRecipeService = require('./iRecipeService');
class EdamamRecipeService extends IRecipeService {
  constructor(app_id, app_key) {
    super();
    this.app_id = app_id;
    this.app_key = app_key;
  }

  async recipeSearchByIngredient(queries) {
    try {
      const queryParameters = queries.map((query) => encodeURIComponent(query)).join('%2C');
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${queryParameters}&app_id=${this.app_id}&app_key=${this.app_key}`;
      const response = await axios.get(url);
      const data = response.data;
      // console.log(data.hits[0].recipe);
      const mappedData = RecipeMap.toDomain(data.hits);
      return mappedData;
    } catch (err) {
      console.error(err);
      throw new Error('Error: Recipes cannot be retrieved');
    }
  }
}

module.exports = EdamamRecipeService;
