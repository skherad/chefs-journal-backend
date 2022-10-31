const router = require('express').Router();
const commentController = require('../controllers/commentController');

router
    .route('/')
    .get(commentController.index)
    .post(commentController.newComment);

router
    .route('/recipe/:recipeId')
    .get(commentController.recipe);

module.exports = router;