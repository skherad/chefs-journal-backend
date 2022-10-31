const router = require('express').Router();
const userController = require('../controllers/userController');

router
    .route('/')
    .get(userController.index);

router
    .route('/explore/:userId')
    .get(userController.explore);

router
    .route('/:userId')
    .get(userController.user)

router
    .route('/friend/:userId')
    .get(userController.friend)

    router
    .route('/friend/:friendId')
    .post(userController.connectFriend)

module.exports = router;