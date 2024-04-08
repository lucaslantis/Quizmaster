import { useEffect, useState } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../utils/apis/authApi";
import toast from "react-hot-toast";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [path, setPath] = useState("/login");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.login(data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (dataRegister.password !== dataRegister.confirmPassword)
      return toast.error("Password not match");
    try {
      await toast.promise(authApi.register(dataRegister), {
        loading: "Registering...",
        success: "Registration successful!",
        error: (err) => err?.data?.message,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="auth">
      <div className={`auth-container ${path !== "/login" && "active"}`}>
        <div className="form-container sign-up">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>

            <span>or use your email for registeration</span>
            <input
              type="text"
              required
              placeholder="Name"
              minLength={2}
              maxLength={10}
              onChange={(e) =>
                setDataRegister((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <input
              type="email"
              required
              placeholder="Email"
              onChange={(e) =>
                setDataRegister((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <input
              type="text"
              required
              placeholder="Username"
              onChange={(e) =>
                setDataRegister((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
            <input
              type="password"
              required
              placeholder="Password"
              minLength={6}
              onChange={(e) =>
                setDataRegister((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setDataRegister((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Log in to Quizmaster</h1>

            <span> use your email password</span>
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <div className="input-container">
              <input
                type={isShowPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="password-input"
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <i
                style={{ cursor: "pointer" }}
                className="fas fa-eye-slash eye-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
           
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                className="hidden"
                id="login"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Teachers love us 😍</h1>
              <p>Join over 200 million educators and learners on Quizmaster</p>
              <button
                className="hidden"
                id="register"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
