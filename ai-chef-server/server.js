import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { generateRecipe } from './open-ai.js';

dotenv.config();



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/generate-recipe', async (req, res) => {
  const { mealType, complexity, time, ingredients } = req.body;
  const recipes = await generateRecipe(ingredients, complexity, time, mealType);
  res.json({ recipes });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
