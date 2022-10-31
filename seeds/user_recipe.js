const usersData = require('../seed_data/users');
const recipesData = require('../seed_data/recipes');
const commentsData = require('../seed_data/comments');
const savesData = require('../seed_data/saves');
const ingredientsData = require('../seed_data/ingredients');
const recipeIngredientData = require('../seed_data/recipe-ingredient');


exports.seed = function (knex) {
    return knex('users')
      .del()
      .then(function () {
        return knex('users').insert(usersData);
      })
      .then(() => {
        return knex('recipes').del();
      })
      .then(() => {
        return knex('recipes').insert(recipesData);
      })
      .then(() => {
        return knex('comments').del();
      })
      .then(() => {
        return knex('comments').insert(commentsData);
      })
      .then(() => {
        return knex('saves').del();
      })
      .then(() => {
        return knex('saves').insert(savesData);
      })
      .then(() => {
        return knex('ingredients').del();
      })
      .then(() => {
        return knex('ingredients').insert(ingredientsData);
      })
      .then(() => {
        return knex('recipe_ingredient').del();
      })
      .then(() => {
        return knex('recipe_ingredient').insert(recipeIngredientData);
      });
  };
  