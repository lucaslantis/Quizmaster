import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import image from '../../resources/images/agontfHi.png'
const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sidenav">
      <div className="profile">
        <img
          src={image}
          className="pro-img"
        />
        <p>
          {user?.name} <span>@{user?.username}</span>
        </p>
      </div>
      <a
        onClick={() => navigate("/admin")}
        className="icon-a"
        style={pathname === "/admin" ? { color: "red" } : {}}
      >
        <i className="fa fa-dashboard icons"></i> Dashboard
      </a>
      <a
        onClick={() => navigate("/admin/quizzes")}
        className="icon-a"
        style={pathname === "/admin/quizzes" ? { color: "red" } : {}}
      >
        <i className="fas fa-question-circle icons"></i> Quizzes
      </a>
    </div>
  );
};

export default SideBar;
