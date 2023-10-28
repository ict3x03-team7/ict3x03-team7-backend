const { GetRecipeByIngredientsRequestDTO } = require('../../dto/getRecipeByIngredientsDTO');

class GetRecipeByIngredientsController {
  constructor(getRecipeByIngredients) {
    this.getRecipeByIngredients = getRecipeByIngredients;
  }

  async execute(req, res) {
    const requestDTO = new GetRecipeByIngredientsRequestDTO(req.query.ingredients);
    try {
      const result = await this.getRecipeByIngredients.execute(requestDTO);
      if (result.Error) {
        res.status(400).json({ result });
      } else if (result) {
        res.status(200).json({ result });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Server Error' });
    }
  }
}

module.exports = GetRecipeByIngredientsController;
