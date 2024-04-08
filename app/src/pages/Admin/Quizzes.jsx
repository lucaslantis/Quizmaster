import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizApi } from "../../utils/apis/quizApi";
import QuizICard from "../../components/QuizICard";

const Quizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizes = async () => {
      const result = await quizApi.getAllQuizzes();
      setQuizzes(result);
    };
    getQuizes();
  }, []);

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {quizzes.map((quiz) => (
          <QuizICard key={quiz._id} {...quiz} />
        ))}
      </div>

      <div className="quize__button--create">
        <button onClick={() => navigate("/admin/quizzes/create")}>+</button>
      </div>
    </div>
  );
};

export default Quizes;
