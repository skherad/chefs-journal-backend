const knex = require('knex')(require('../knexfile'));

// get all comments 
exports.index = (_req, res) => {
  knex('comments')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

// get all comments for a specific recipe
exports.recipe = (req, res) => {
  knex('comments')
    .join('users', 'users.id', "=", "comments.user_id")
    .select("*")
    .where("comments.recipe_id", req.params.recipeId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

// post new comments
exports.newComment = (req, res) => {
  knex('comments').insert(req.body)
  .then(data => 
    res.status(201).json(data[0]))
    .catch(err => console.log(err))
  }