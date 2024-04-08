import { useEffect, useState } from "react";
import { dataCategory, dataDifficulty } from "../../resources/data";
import "./styles.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { quizApi } from "../../utils/apis/quizApi";

const FormQuiz = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    question: "",
    answers: [],
    category: dataCategory[0].value,
    difficulty: dataDifficulty[0].value,
    correctAnswers: [],
    score: 5,
  });
  const [newAnswer, setNewAnswer] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await quizApi.getQuiz(id);
      setData(quiz);
    };
    if (id) getQuiz();
  }, [id]);

  const addAnswer = () => {
    if (newAnswer === "" || data.answers.length >= 4) return;
    if (data.answers.includes(newAnswer))
      return toast.error("Answer already exists!");
    setData((prevState) => ({
      ...prevState,
      answers: [...prevState.answers, newAnswer],
    }));
    setNewAnswer("");
  };

  const selectionAnswerCorrect = (answer) => {
    if (data.correctAnswers.includes(answer)) {
      setData((prevState) => ({
        ...prevState,
        correctAnswers: data.correctAnswers.filter((ans) => ans !== answer),
      }));
    } else if (data.correctAnswers.length < 3) {
      setData((prevState) => ({
        ...prevState,
        correctAnswers: [...prevState.correctAnswers, answer],
      }));
    }
  };

  const removeAnswer = (answer) => {
    if (data.answers.includes(answer)) {
      setData((prevState) => ({
        ...prevState,
        answers: data.answers.filter((ans) => ans !== answer),
      }));
    }
  };

  const handleAddQuiz = async () => {
    if (data.correctAnswers.length === 0)
      return toast.error("Please select an answer");
    try {
      await toast.promise(quizApi.createQuiz(data), {
        loading: "Creating...",
        success: "Quiz created!",
        error: "Quiz not created!",
      });
      navigate("/admin/quizzes");
    } catch (error) {
      toast.error("Create failed");
    }
  };

  const handleEditQuiz = async () => {
    try {
      await toast.promise(quizApi.updateQuiz(id, data), {
        loading: "Updating...",
        success: "Quiz updated!",
        error: "Quiz not updated!",
      });
      navigate("/admin/quizzes");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="quiz__form">
      <div className="content">
        <div className="start-screen">
          <h1 className="heading">{id ? "Edit" : "Create"} Quiz</h1>
          <input
            value={data.question}
            placeholder="Question..."
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                question: e.target.value,
              }))
            }
            style={{
              width: "100%",
              height: "40px",
              padding: "10px",
              outline: "none",
              border: "none",
              borderRadius: "5px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "10px",
            }}
          >
            {data.answers.map((answer, index) => (
              <div
                key={answer}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </span>
                <input
                  placeholder="Answer..."
                  value={answer}
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "10px",
                    outline: "none",
                    border: "none",
                    borderRadius: "5px",
                  }}
                />
                <button
                  onClick={() => selectionAnswerCorrect(answer)}
                  style={{
                    width: "100px",
                    height: "40px",
                    padding: "10px",
                    outline: "none",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: data.correctAnswers.includes(answer)
                      ? "green"
                      : "white",
                    color: "black",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {data.correctAnswers.includes(answer)
                    ? "Correct"
                    : "Incorrect"}
                </button>
                <button
                  onClick={() => removeAnswer(answer)}
                  style={{
                    width: "40px",
                    height: "40px",
                    padding: "10px",
                    outline: "none",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#F9455B",
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "10px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <input
              placeholder={`Answer ${data.answers.length + 1}`}
              onChange={(e) => setNewAnswer(e.target.value)}
              value={newAnswer}
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
                outline: "none",
                border: "none",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={addAnswer}
              style={{
                width: "80px",
                height: "40px",
                outline: "none",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: data.answers.length < 4 ? "#A2DBEB" : "gray",
              }}
            >
              Add answer
            </button>
          </div>

          <label htmlFor="category">Enter score:</label>
          <input
            value={data.score}
            placeholder={"Score (default is 5)"}
            type="number"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                score: e.target.value,
              }))
            }
            style={{
              width: "100%",
              height: "40px",
              padding: "10px",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              marginBottom: "10px ",
            }}
          />
          <div className="settings">
            <label htmlFor="category">Select Category:</label>
            <select
              id="category"
              value={+data.category}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              {dataCategory.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.text}
                </option>
              ))}
            </select>
            <label htmlFor="difficulty">Select difficulty:</label>
            <select
              id="difficulty"
              value={data.difficulty}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  difficulty: e.target.value,
                }))
              }
            >
              {dataDifficulty.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.text}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              className="btn"
              onClick={id ? handleEditQuiz : handleAddQuiz}
            >
              {id ? "Edit" : "Create"}
            </button>
            <button
              className="btn"
              onClick={() => navigate("/admin/quizzes")}
              style={{
                background: "orange",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormQuiz;
