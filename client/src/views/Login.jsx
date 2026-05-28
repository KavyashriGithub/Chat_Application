import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import apiClient from "../services/api";
import Notification from "../Components/Notification";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/chat");
    }
  }, [token, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/chat");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <Notification
        type="error"
        message={error}
        onClose={() => setError(null)}
      />
      <div className="loginCard">
        <div className="loginContainer">
          <h2>Login</h2>
          <div className="formgroup">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="formgroup">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;