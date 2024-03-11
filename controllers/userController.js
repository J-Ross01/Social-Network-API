const User = require('../models/User');

// Retrieves all users from the database.
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.json(users);
        } catch(error) {
            res.status(500).json(error);
        }
};

// Fetches a specific user by their ID.
const getUserById = async (req, res) => {
    try {
// Finds a user document by ID and populates 'thoughts' and 'friends'.
      const user = await User.findById(req.params.id).populate('thoughts friends');
      if (!user) {
        res.status(404).json({ message: 'No user found!' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Creates a new user with the provided data.
  const createUser = async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  };

// Updates an existing user's data based on the provided ID.
  const updateUser = async (req, res) => {
    try {
// Updates the user document with new data and returns the updated document.
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found!' });
        return;
      }
      // Sends the updated user data as JSON.
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  };

// Deletes a user and their associated thoughts from the database.
  const deleteUser = async (req, res) => {
    try {
      const userToDelete = await User.findByIdAndDelete(req.params.id);
      if (!userToDelete) {
        res.status(404).json({ message: 'No user found!' });
        return;
      }

// Deletes all thoughts associated with the deleted user.
      await Thought.deleteMany({ username: userToDelete.username });

      res.json({ message: 'User and their thoughts are deleted!' });
    } catch (error) {
      res.status(400).json(error);
    }
  };
  

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}