import "./styles.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="header">
      <div className="logo">
        <a href="/" className="">
          Quiz master
        </a>
      </div>
      <ul className="links">
        <li>
          <a onClick={() => navigate("/")}>Home</a>
        </li>
        <li>
          <a onClick={() => navigate("/quiz")}>Quiz</a>
        </li>
        <li>
          <a onClick={() => navigate("/about")}>About</a>
        </li>
      </ul>
      <div className="nav-buttons">
        {user?.role === "admin" && (
          <button
            className="button admin-btn"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        )}
        {user && (
          <button className="button" onClick={() => navigate("/profile")}>
            {user?.name}
          </button>
        )}
        {!user && (
          <button className="button" onClick={() => navigate("/login")}>
            Log in
          </button>
        )}

        {user && (
          <button
            style={{
              padding: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              style={{ color: "red", width: "16px", fontSize: "1.5rem" }}
            ></i>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
