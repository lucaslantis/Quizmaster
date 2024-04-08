import { useEffect, useState } from "react";
import "./styles.css";
import { quizAttemptApi } from "../../utils/apis/quizAttemptApi";
import { quizApi } from "../../utils/apis/quizApi";
import { userApi } from "../../utils/apis/userApi";

const Dashboard = () => {
  const [topRank, setTopRank] = useState([]);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [topRank, users, quizzes] = await Promise.all([
        quizAttemptApi.getAllQuizAttempts(),
        userApi.getUsers(),
        quizApi.getAllQuizzes(),
      ]);
      setTopRank(topRank);
      setUsers(users);
      setQuizzes(quizzes);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="boxs">
        <div className="box">
          <p>
            {users.length}
            <br />
            <span>Users</span>
          </p>
          <i className="fa fa-users box-icon"></i>
        </div>
        <div className="box">
          <p>
            {quizzes.length}
            <br />
            <span>Quiz master</span>
          </p>
          <i className="fa fa-list box-icon"></i>
        </div>
      </div>

      <div className="col-div-8">
        <div className="box-8">
          <div className="content-box">
            <p>Top Rank</p>
            <br />
            <table>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Score</th>
              </tr>
              {topRank?.map((data) => (
                <tr key={data._id}>
                  <td>{data.user?.username}</td>
                  <td>{data.user?.email}</td>
                  <td>{data?.score}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
