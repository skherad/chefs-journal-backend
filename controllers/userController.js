const knex = require('knex')(require('../knexfile'));

// get all users
exports.index = (_req, res) => {
  knex('users')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

// get all users except for a specific user
exports.explore = (req, res) => {
  knex('users')
    .select("*")
    .from("users")
    .whereNot("id", req.params.userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
};

// get specific user's information
exports.user = (req, res) => {
  knex('users')
    .select("*")
    .from('users')
    .where('id', req.params.userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
    res.status(400).send(`Error retrieving users: ${err}`)
  );
}

// get friends of a specific user
exports.friend = (req, res) => {
  knex('users')
    .join('friends', 'friends.friend_id', "=", "users.id")
    .select("*")
    .where("friends.user_id", req.params.userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving users: ${err}`)
    );
}

// post a new saved connection
exports.connectFriend = (req, res) => {
  knex('friends').insert(req.body)
  .then((data) => {
    res.status(201).json(data[0])
  })
  .catch(err => console.log(err))
}