const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: "Chocolate Chip Cookies",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup light brown sugar",
        "1 large egg",
        "2 tablespoons milk",
        "1 1/4 teaspoons vanilla extract",
        "2 cups semisweet chocolate chips",
      ],
      cuisine: "French",
      dishType: "dessert",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
      duration: 30,
      creator: "Chef Jennifer",
    };
    const created = Recipe.create(newRecipe);
    return created;
  })
  .then(() => {
    const AllRecipesInDb = Recipe.insertMany(data);
    return AllRecipesInDb;
  })
  .then((recipesJson) => {
    const titles = recipesJson.map((e) => e.title);
    console.log("todas las recipes en la db", titles);
  })
  .then(() => {
    const updateRecipe = Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 400 },
      { new: true }
    );
    return updateRecipe;
  })
  .then(() => {
    const recipeRm = Recipe.deleteOne({ title: "Carrot Cake" });
    return recipeRm;
  })
  .then(() => {
    const close = mongoose.connection.close();
    return close;
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
