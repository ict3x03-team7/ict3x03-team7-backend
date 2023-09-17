const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log('[Server]: RecipeHub Server started!');
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
