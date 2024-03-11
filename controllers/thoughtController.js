const Thought = require('../models/Thought');
const User = require('../models/User');

// Retrieves all thoughts from the database.
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Fetches a specific thought by its ID.
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this ID!' });
      return;
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Creates a new thought with the provided data.
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
     // Updates the user's document by adding the thought's ID to their thoughts array.
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.json(newThought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Updates an existing thought's data based on the provided ID.
const updateThought = async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found!' });
        return;
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json(error);
    }
  };

// Deletes a specific thought from the database.
  const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found!' });
        }
// Removes a specific thought from the database. 
        await thought.remove();
        res.json({ message: 'Thought deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting thought', error: error });
    }
};

module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
  };
