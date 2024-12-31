import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post("https://backend-6wvj.onrender.com/user/login", {
        username,
        password,
      })
      .then((res) => {
        const { token, username } = res.data;
        console.log("Username:", username);

        localStorage.setItem("token", token);
        localStorage.setItem("user", username);

        enqueueSnackbar("Login successfull", { variant: "success" });
        navigate("/home", { state: { username } });
      })
      .catch((error) => {
        enqueueSnackbar("Login faild", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="mx-4 my-4">Login</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-3 mr-4">Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2"
          />
        </div>

        <div className="my-4">
          <label className="mx-3 mr-4">Password</label>

          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2"
          />
        </div>
        <button
          className="btn btn-primary mx-4 my-2 p-2"
          style={{ width: 300 }}
          onClick={handleLogin}
        >
          Login
        </button>
        <div>
          <p className="mx-4">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
