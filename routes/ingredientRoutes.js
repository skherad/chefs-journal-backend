const router = require('express').Router();
const ingredientController = require('../controllers/ingredientController');

router
    .route('/')
    .get(ingredientController.index)

router
    .route('/recipe/:recipeId')
    .get(ingredientController.singleRecipe)


module.exports = router;