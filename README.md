# API-social-network
This is a social media API built using Node.js, Express, and MongoDB. It provides endpoints to handle users, thoughts, reactions, and friend connections.


Certainly! Here's an updated version of the README.md file that includes a section for credits and acknowledgments:

markdown
Copy code
# Social Media API

This is a social media API built using Node.js, Express, and MongoDB. It provides endpoints to handle users, thoughts, reactions, and friend connections.

## Prerequisites

- Node.js (version >= 12)
- MongoDB (installed and running)

## Getting Started

API Documentation
Please refer to the API documentation below for details on the available routes and request/response formats.

Users
GET /api/users: Get all users.
GET /api/users/:id: Get a single user by ID.
POST /api/users: Create a new user.
PUT /api/users/:id: Update a user by ID.
DELETE /api/users/:id: Delete a user by ID.
POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list.
DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list.
Thoughts
GET /api/thoughts: Get all thoughts.
GET /api/thoughts/:id: Get a single thought by ID.
POST /api/thoughts: Create a new thought.
PUT /api/thoughts/:id: Update a thought by ID.
DELETE /api/thoughts/:id: Delete a thought by ID.
POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought.
DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought.