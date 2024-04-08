import { axiosClient } from "../axiosConfig";

export const quizApi = {
  createQuiz: (quiz) => axiosClient.post("/quiz", { quiz }),
  getAllQuizzes: () => axiosClient.get("/quiz"),
  getQuiz: (id) => axiosClient.get(`/quiz/${id}`),
  getQuizQuery: ({ category, difficulty, number }) =>
    axiosClient.get(
      `/quiz/q?category=${category}&difficulty=${difficulty}&number=${number}`
    ),
  updateQuiz: (id, quiz) => axiosClient.put(`/quiz/${id}`, { quiz }),
  deleteQuiz: (id) => axiosClient.delete(`/quiz/${id}`),
};
