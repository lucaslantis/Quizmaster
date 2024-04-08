import toast from "react-hot-toast";
import { quizApi } from "../utils/apis/quizApi";
import { useNavigate } from "react-router-dom";

const QuizICard = (quiz) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/quizzes/edit/${quiz._id}`);
  };

  const handleDelete = async () => {
    try {
      await toast.promise(quizApi.deleteQuiz(quiz._id), {
        loading: "Deleting Quiz...",
        success: "Quiz deleted successfully",
        error: (error) => `Error: ${error.message}`,
      });
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        width: "30%",
        minWidth: "400px",
        minHeight: "200px",
        gap: "15px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "50%",
          width: "100%",
          background: "rgba(255, 255, 255, 0.2)",
          textAlign: "center",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <h3>{quiz.question}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {quiz.answers.map((answer) => (
          <button
            key={answer}
            style={{
              padding: "10px",
              width: "40%",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontSize: "15px",
              backgroundColor: quiz.correctAnswers.includes(answer)
                ? "#12AD2B"
                : "gray",
            }}
          >
            {answer}
          </button>
        ))}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          style={{
            padding: "10px",
            width: "40%",
            border: "none",
            borderRadius: "5px",
            color: "orange",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          style={{
            padding: "10px",
            width: "40%",
            borderRadius: "5px",
            color: "red",
            fontWeight: "bold",
            border: "none",
            fontSize: "15px",
            backgroundColor: "white",
            cursor: "pointer",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuizICard;
