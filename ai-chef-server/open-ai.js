import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// Initialize the OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define the schema for recipe instructions
const instructions = z.object({
    step: z.string(),
    stepTitle: z.string(),
    description: z.string(),
});

// Define the schema for a complete recipe
const Recipe = z.object({
    title: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    instructions: z.array(instructions),
});

const Recipes=z.object({
    recipes:z.array(Recipe),
});

const generateRecipe = async (ingredients, complexity, time, mealType) => {
  const response = await client.responses.parse({
    model: "gpt-4o-2024-08-06",
    input: [
      { role: "system", content: "Extract the event information." },
      {
        role: "user",
        content: `Create 5 recipes based on the following ingredients: ${ingredients.join(', ')}. 
        The recipes should be ${complexity} level and take ${time} minutes to prepare. 
        The recipes should be for a ${mealType} meal. 
        Each recipe should include a title, a short description, an ingredients list, and a list of instructions.`,
      },
    ],
    text: {
      format: zodTextFormat(Recipes, "recipes"),
    },
  });
  console.log(response);
  return response.output_parsed;
};

export { generateRecipe };
