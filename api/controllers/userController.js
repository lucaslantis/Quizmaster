const User = require("../models/userModel");
const userQuizAttemptModel = require("../models/userQuizAttemptModel");

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      await userQuizAttemptModel.findOneAndDelete({ user: req.params.id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json("User deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
