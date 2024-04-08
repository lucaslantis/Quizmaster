import { useEffect, useState } from "react";
import "./styles.css";
import toast from "react-hot-toast";
import { userApi } from "../../utils/apis/userApi";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    username: user?.username,
    password: user?.password,
  });

  useEffect(() => {
    setData({
      username: user?.username,
      password: user?.password,
    });
  }, []);

  const updateUser = async () => {
    try {
      const res = await toast.promise(userApi.updateUser(user._id, data), {
        loading: "Updating user...",
        success: "User updated",
        error: "Error updating user",
      });
      setData({
        username: res?.username,
        password: res.password,
      });
      setIsEdit(false);
    } catch (error) {
      toast.error(error?.message || "Edit failed");
    }
  };

  return (
    <div className="profile">
      <div className="card">
        <div className="header">
          <div className="main">
           
            <h3 className="name">{user?.name}</h3>
            <h3 className="sub-name">@{user?.username}</h3>
            <div className="user-core">
              <div className="user-core-item">
                <h3 className="number">9</h3>
                <h3 className="number-title">Quiz</h3>
              </div>
          
            </div>
          </div>
        </div>

        <div className="content">
          <div className="about-container">
            <h3 className="title">About</h3>
            <p className="text" style={{ color: "#555" }}>
              
            </p>
          </div>
      

          <div className="user-form">
            <div className="user-form-item">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled
              />
            </div>
            <div className="user-form-item">
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                disabled={!isEdit}
                required
                minLength={2}
                maxLength={10}
                value={data.username}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>

            {isEdit ? (
              <div className="user-form-item">
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={data?.password}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            ) : null}
            <div className="user-buttons">
              {!isEdit ? (
                <button onClick={() => setIsEdit(!isEdit)}>Edit Profile</button>
              ) : (
                <button onClick={updateUser}>Sumit</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
