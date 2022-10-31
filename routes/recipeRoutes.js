const router = require('express').Router();
const recipeController = require('../controllers/recipeController');

router
    .route('/')
    .get(recipeController.index)
    .post(recipeController.newRecipe);

router
    .route('/:userId')
    .get(recipeController.user)

router
    .route('/explore/:userId')
    .get(recipeController.explore)

router
    .route('/saved/:userId')
    .get(recipeController.save)


router
    .route('/singleRecipe/:recipeId')
    .get(recipeController.singleRecipe)
    .post(recipeController.saveRecipe)
    .delete(recipeController.deleteRecipe)

router
    .route('/library/:userId')
    .get(recipeController.library)

module.exports = router;