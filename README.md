# Social Network API

## Description

This Social Network API is built for a social media startup, leveraging the power of a NoSQL database to handle large amounts of unstructured data efficiently. It allows for managing user profiles, their thoughts (posts), reactions to thoughts, and user friendships.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Usage

To start the server and sync the Mongoose models to the MongoDB database, run:

```bash
npm start
```

Ensure that MongoDB is running on your machine to connect the database with the application.

### User Routes

- **GET /api/users**: Fetch all users
- **GET /api/users/:id**: Fetch a single user by ID
- **POST /api/users**: Create a new user
- **PUT /api/users/:id**: Update a user by ID
- **DELETE /api/users/:id**: Delete a user by ID

### Thought Routes

- **GET /api/thoughts**: Fetch all thoughts
- **GET /api/thoughts/:id**: Fetch a single thought by ID
- **POST /api/thoughts**: Create a new thought
- **PUT /api/thoughts/:id**: Update a thought by ID
- **DELETE /api/thoughts/:id**: Delete a thought by ID

### Reactions Routes

- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought

### Friends Routes

- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user's friend list
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user's friend list

## Testing

Created tests using Jest for testing my models. 
Use Insomnia to test the API routes. The API routes should allow you to:

- Start the server and sync the database
- Access data for users and thoughts in a formatted JSON through GET routes
- Successfully create, update, and delete users and thoughts using POST, PUT, and DELETE routes
- Create and delete reactions to thoughts
- Add and remove friends from a user's friend list

## Contribution

This project is open for contributions: https://github.com/J-Ross01/Social-Network-API

## Sources

- Incorporating mongodb as the NoSQL backend: https://www.mongodb.com/nodejs-database
- Used moment library to help format dates and time: https://momentjs.com/docs/
- Createing the Route properties I refrenced: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

## License

[MIT] LICENSE.md
