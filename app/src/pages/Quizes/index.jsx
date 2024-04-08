import { useEffect, useState } from "react";
import { quizApi } from "../../utils/apis/quizApi";

const Quizes = () => {
  const [quizes, setQuizes] = useState([]);
  useEffect(() => {
    const getQuizes = async () => {
      const result = await quizApi.getAllQuizzes();
      setQuizes(result);
    };
    getQuizes();
  }, []);
  console.log(quizes);
  return <div>Quizes</div>;
};

export default Quizes;
