require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDB = require("./mongoose");
const { login, register, checkAuth } = require("./controllers/authController");
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("./controllers/userController");
const {
  createQuiz,
  getAllQuizzes,
  quizQuery,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require("./controllers/quizController");
const {
  getAllQuizAttempts,
  createQuizAttempt,
  updateQuizAttemptScore,
  getQuizAttemptsForUser,
} = require("./controllers/quizAttemptController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.post("/api/v1/auth/login", login);
app.post("/api/v1/auth/signup", register);
app.post("/api/v1/auth/check-auth", checkAuth);

app.get("/api/v1/users/:id", getUser);
app.get("/api/v1/users", getUsers);
app.put("/api/v1/users/:id", updateUser);
app.delete("/api/v1/users/:id", deleteUser);

app.post("/api/v1/quiz", createQuiz);
app.get("/api/v1/quiz", getAllQuizzes);
app.get("/api/v1/quiz/q", quizQuery);
app.get("/api/v1/quiz/:id", getQuiz);
app.put("/api/v1/quiz/:id", updateQuiz);
app.delete("/api/v1/quiz/:id", deleteQuiz);

app.post("/api/v1/quizAttempt", createQuizAttempt);
app.put("/api/v1/quizAttempt", updateQuizAttemptScore);
app.get("/api/v1/quizAttempt/:userId", getQuizAttemptsForUser);
app.get("/api/v1/quizAttempt", getAllQuizAttempts);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  connectToDB();
});
