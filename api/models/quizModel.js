const { default: mongoose } = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answers: {
      type: [String],
      required: true,
    },
    correctAnswers: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
