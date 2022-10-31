const knex = require('knex')(require('../knexfile'));

// get all ingredients
exports.index = (_req,res) => {
    knex('ingredients')
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving users: ${err}`)
        })
}

// get all ingredients for a specific recipe
exports.singleRecipe = (req, res) => {
    knex('ingredients')
      .join('recipe_ingredient', 'ingredients.id', "=", "recipe_ingredient.ingredient_id")
      .select("*")
      .where("recipe_ingredient.recipe_id", req.params.recipeId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving users: ${err}`)
      );
  };
  