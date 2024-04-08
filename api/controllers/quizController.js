const Quiz = require("../models/quizModel");

const quizController = {
  createQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.create(req.body.quiz);
      return res.status(201).json(quiz);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllQuizzes: async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });
      return res.status(200).json(quiz);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body.quiz, {
        new: true,
      });
      return res.status(200).json(quiz);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findByIdAndDelete(req.params.id);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });
      return res.status(200).json("Delete Quiz successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  quizQuery: async (req, res) => {
    let query = {};
    if (req.query.category !== "") {
      query.category = req.query.category;
    }
    if (req.query.difficulty !== "") {
      query.difficulty = req.query.difficulty;
    }

    try {
      let pipeline = [
        { $match: query },
        { $sample: { size: parseInt(req.query.number) } },
      ];
      const quizzes = await Quiz.aggregate(pipeline);

      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = quizController;
