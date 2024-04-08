const UserQuizAttempt = require("../models/userQuizAttemptModel");
const Quiz = require("../models/quizModel");
const userQuizAttemptModel = require("../models/userQuizAttemptModel");

const quizAttemptController = {
  createQuizAttempt: async (req, res) => {
    const { userId, quizId } = req.body;
    try {
      // check quiz existence
      const quizExists = await Quiz.exists({ _id: quizId });
      if (!quizExists) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // create a new quiz
      const newAttempt = new UserQuizAttempt({
        user: userId,
        quiz: quizId,
        dateAttempted: new Date(),
        score: 0,
      });

      const savedAttempt = await newAttempt.save();
      return res.status(201).json(savedAttempt);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateQuizAttemptScore: async (req, res) => {
    const { id, score } = req.body;
    try {
      // check quiz existence if it dont existed then create new quiz
      const updatedAttempt = await UserQuizAttempt.findOneAndUpdate(
        { user: id },
        { score }
      );
      if (!updatedAttempt) {
        await UserQuizAttempt.create({
          user: id,
          score,
        });
      }

      // return quiz with user data
      const quizzes = await UserQuizAttempt.find().populate("user");

      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getQuizAttemptsForUser: async (req, res) => {
    const { userId } = req.params;
    try {
      // find and return with quiz data
      const quizAttempts = await UserQuizAttempt.find({ user: userId })
        .populate("quiz")
        .exec();

      return res.json(quizAttempts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllQuizAttempts: async (req, res) => {
    //
    try {
      // Fetch the top 10 quiz attempts from the database, sorted by score in descending order
      const result = await userQuizAttemptModel
        .find()
        .populate({
          path: "user", // Populate the 'user' field to get user information
        })
        .limit(10) // Limit the results to 10 records
        .sort({ score: -1 }) // Sort the results by 'score' field in descending order
        .exec(); // Execute the query

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = quizAttemptController;
