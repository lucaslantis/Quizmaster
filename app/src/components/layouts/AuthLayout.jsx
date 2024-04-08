import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authApi } from "../../utils/apis/authApi";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authApi.checkAuth();
      if (!token || !user) {
        navigate("/");
      }
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate, token]);

  return isLoading ? <h5>Loading...</h5> : <Outlet />;
};

export default AuthLayout;
