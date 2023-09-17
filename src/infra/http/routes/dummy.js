const express = require('express');
const dotenv = require('dotenv');
const getDummyByNameController = require('../../../modules/dummy/usecases/getDummyByName/index.js');
dotenv.config();
const dummyRouter = express.Router();

dummyRouter.get('/:name', async (req, res) => {
  getDummyByNameController.execute(req, res);
});

dummyRouter.get('/recipe/:ingredient', async (req, res) => {
  const ingredient = req.params.ingredient;
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text();
    const parsedResult = JSON.parse(data); // Parse the result into JSON
    const expandedResult = JSON.stringify(parsedResult, null, 2); // Pretty-print the JSON object
    // console.log(parsedResult); // Log the expanded JSON object
    res.status(200).json(parsedResult);
    // console.log('Recipes:', data);
  } catch (error) {
    console.error('Error:', error);
  }
});

module.exports = dummyRouter;
