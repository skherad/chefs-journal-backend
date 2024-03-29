const knex = require('knex')(require('../knexfile'));
uniqid = require('uniqid');
const API_URL = process.env.API_URL

// get all recipes
exports.index = (_req, res) => {
  knex('recipes')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

// get all recipes for a specific user
exports.user = (req, res) => {
  knex('recipes')
    .select("*")
    .from("recipes")
    .where("user_id", req.params.userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

// get all recipes that are not saved or created by a specific user
exports.explore = (req, res) => {
  knex.select('id', 'title', 'category', 'photo')
  .from('recipes')
  .whereNotIn('id', 
    knex.select('recipe_id')
    .from('saves')
    .where('user_id', req.params.userId)
  )
  .andWhereNot('user_id', req.params.userId)
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch(err => console.log(err))
};

exports.save = (req, res) => {
  knex('recipes')
    .join('saves', 'recipes.id', "=", "saves.recipe_id")
    .select("*")
    .where("saves.user_id", req.params.userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

exports.singleRecipe = (req, res) => {
  knex.select("recipes.id", 'recipes.title', 'recipes.instructions','recipes.user_id' ,'recipes.category', 'recipes.photo', 'users.name')
    .from('recipes')
    .innerJoin('users', 'recipes.user_id', 'users.id')
    .where("recipes.id", req.params.recipeId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

exports.saveRecipe = (req, res) => {
  console.log(req.body)
  knex('saves').insert(req.body)
  .then((data) => {
    res.status(201).json(data[0])
  })
  .catch(err => console.log(err))
}

exports.unSaveRecipe = (req, res) => {
  console.log(req)
  knex('saves')
  .where('recipe_id', req.body.recipe_id)
  .andWhere( 'user_id', req.body.user_id)
  .del()
  .then((data)=>{
    res.status(201).json(data[0])
  })
  .catch(err => console.log(err))
}

exports.library = (req, res) => {
  knex.select('recipes.id')
  .from('recipes')
  .leftJoin('saves', 'recipes.id','saves.recipe_id')
  .where('recipes.user_id', req.params.userId).orWhere('saves.user_id', req.params.userId)
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch(err => console.log(err))
}

exports.newRecipe = (req, res) => {
  // const {data} = req.file.foodpic;

  let newRecipe = {
    title: req.body.title,
    instructions: req.body.instructions,
    user_id: req.body.user_id,
    category: req.body.category,
    photo: `${API_URL}/public/menu.png`
  }

  knex('recipes').insert(newRecipe)
  .then((data) => {
    res.status(201).json(data[0])
    let newIngredient = [];
    req.body.ingredients.map(ingredient=>newIngredient.push(
      {
        ingredient_id: ingredient.value,
        qty: ingredient.qty,
        unit: ingredient.unit,
        recipe_id: data[0]
      }
    ))
    knex('recipe_ingredient').insert(newIngredient)
    .then(data=>res.status(201).json(data))
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))
}

exports.updateRecipe = (req, res) => {

  let updateRecipe = {
    id: req.body.id,
    title: req.body.title,
    instructions: req.body.instructions,
    category: req.body.category,
  }
  
  knex('recipes')
  .where('id', updateRecipe.id)
  .update({
    title: updateRecipe.title,
    instructions: updateRecipe.instructions,
    category: updateRecipe.category
  })
  .then(data=>{
    res.status(201).json(data)
    knex('recipe_ingredient')
    .where('recipe_id', req.body.id)
    .del()
    .then(data=>{
      let updateIngredient = [];
      req.body.ingredients.map(ingredient=>updateIngredient.push(
        {
          ingredient_id: ingredient.value,
          qty: ingredient.qty,
          unit: ingredient.unit,
          recipe_id: req.body.id
        }
      ))
      knex('recipe_ingredient').insert(updateIngredient)
      .then(data=>res.status(201).json(data))
      .catch(err=>console.log(err))
    
    })
    .catch(err=>console.log(err))
    })
  .catch(err=>console.log(err))
  }

exports.deleteRecipe = (req, res) => {
  knex('recipes')
  .where('id', req.params.recipeId)
  .del()
  .then((data)=>{
    res.status(201).json(data[0])
  })
  .catch(err => console.log(err))
}