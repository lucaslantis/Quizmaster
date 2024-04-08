import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authApi } from "../../utils/apis/authApi";

const AppLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) return navigate("/login");
    const checkAuth = async () => {
      try {
        const { user } = await authApi.checkAuth();
        if (!user) return navigate("/login");
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, [navigate, token]);
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};

export default AppLayout;
