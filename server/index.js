const express = require('express');
const cors = require('cors');
const { RECOMMENDED_RECIPES } = require('./data');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/api/recipes', (req, res) => {
  res.json(RECOMMENDED_RECIPES);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
