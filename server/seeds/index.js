// Requiring in connections, models, and database
const db = require("../config/connections");
const Recipe = require("../models/Recipe");
const recipeData = require("./recipes.json");

// Starting new connection
db.once("open", async() => {

  // Clearing Collections
  const recipeExists = await db.db.listCollections({name: "recipes"}).toArray();
  if(recipeExists.length) {
    await db.db.dropCollection("recipes");
  }
  const reviewExists = await db.db.listCollections({name: "reviews"}).toArray();
  if(reviewExists.length) {
    await db.db.dropCollection("reviews");
  }
  const userExists = await db.db.listCollections({name: "users"}).toArray();
  if(userExists.length) {
    await db.db.dropCollection("users");
  }

  // Iterating over each recipe
  const recipesModellized = [];
  recipeData.forEach((recipe) => {
    const ingredients = [];
    const measurements = [];
    for(let i=1; i<20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measurementKey = `strMeasure${i}`;
      const ingredient = recipe[ingredientKey];
      const measurement = recipe[measurementKey];
      if (ingredient && measurement) {
        ingredients.push(ingredient);
        measurements.push(measurement);
      }
    }
    const recipeModellized = {
      title: recipe.title,
      category: recipe.category,
      instructions: recipe.instructions,
      ingredients: ingredients,
      measurements: measurements,
      picture: recipe.picture
    };
    recipesModellized.push(recipeModellized);
  });

  // Creating new collection
  try {
    await Recipe.insertMany(recipesModellized)
    console.log("🌱 Recipe seeding successful 🌱")
  } catch(err){
    console.log("Recipe seeding failed: " + err.message)
  }

  // Ending connection
  process.exit(0)
})