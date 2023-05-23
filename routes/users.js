const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Thought = require('../models/Thought');

// GET all users
router.get('/', (req, res) => {
  User.find()
    .populate('thoughts')
    .populate('friends')
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .populate('thoughts')
    .populate('friends')
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

// POST a new user
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

// PUT to update a user by its _id
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
});

// DELETE to remove user by its _id
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      // Remove user's associated thoughts
      return Thought.deleteMany({ _id: { $in: user.thoughts } });
    })
    .then(() => {
      res.json({ message: 'User and associated thoughts deleted' });
    })
    .catch(err => res.status(400).json(err));
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
