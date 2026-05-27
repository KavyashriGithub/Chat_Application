import React from "react"; 
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import PrivateRoute from "./routes/privateRoute";
import Chat from "./views/Chat";

function App() {
  return (
     
    <>
 
      <Routes >
        //Signup page
        <Route  path="/signup" element={<Signup />} />
        //Login page
        <Route path="/login" element={<Login />} />
        //Chat
        <Route  path="/chat"  element={ <PrivateRoute> <Chat /> </PrivateRoute> } />
        <Route path="/" element={<PrivateRoute></PrivateRoute>} />
      </Routes>
    </>
    
  );
}

export default App;
