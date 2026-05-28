import { useNavigate } from "react-router-dom";
import "./Navigation.css";
function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="bg-container">
      <h1 className="welcome-message">Welcome to the Chat App</h1>
      <button className="btn-signup" onClick={() => navigate("/signup", { replace: true })}>
        Signup
      </button>
      <button className="btn-login" onClick={() => navigate("/login", { replace: true })}>
        Login
      </button>
    </div>
  );
}

export default Navigation;