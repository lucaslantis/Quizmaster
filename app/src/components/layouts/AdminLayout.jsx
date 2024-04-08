import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import { useEffect, useState } from "react";
import { authApi } from "../../utils/apis/authApi";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await authApi.checkAuth();
      const token = localStorage.getItem("token");
      if (!token || !user || user.role !== "admin") {
        navigate("/login");
      } else {
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(user));
      }
    };
    checkAuth();
  }, [navigate]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "1rem",
        }}
      >
        <SideBar />
        <div style={{ flex: 1, paddingLeft: "250px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
