const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.json(users);
        } catch(error) {
            res.status(500).json(error);
        }
};

const getUserById = async (req, res) => {
    try {
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

  const createUser = async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  const updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found!' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const userToDelete = await User.findByIdAndDelete(req.params.id);
      if (!userToDelete) {
        res.status(404).json({ message: 'No user found!' });
        return;
      }

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