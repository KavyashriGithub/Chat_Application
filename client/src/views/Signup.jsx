import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import Notification from "../Components/Notification";
import apiClient from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      //   Todo: validation
      const response = await apiClient.post("/api/signup", {
        username: name,
        email: email,
        password: password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
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
<div className="signup">
      <div id="signupContainer" className="signupContainer">
        <div className="signupCard">
          <h2 className="signupTitle">Sign Up</h2>
          <div id="formgroup" className="formgroup">
            <label>Name :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <br/>
          <div id="formgroup2" className="formgroup">
            <label> Email  :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <br/>
          <div id="formgroup1" className="formgroup">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="buttonContainer">
          <button className="signupbutton" onClick={handleSignup}>
            signup
          </button>
          </div>
          <p>
            Already have an account? <Link to={"/login"}>login</Link>
          </p>
        </div>
      </div>
</div>
      {/* <div id="signupContainer" className="signupContainer">
        <h2>signup</h2>
        <div id="group" className="group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div id="group" className="group">
          <label> Email </label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div id="group" className="group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button className='signupButton' onclick ={handleSignup}>Signup</button>
        <p>Already have an account? </p>
      </div> */}
    </>
  );
}

export default Signup;
