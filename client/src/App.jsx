import React from "react"; 
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import PrivateRoute from "./routes/privateRoute";
import Chat from "./views/Chat";
import Navigation from "./Components/Navigation/Navigation";
import Test from "./Components/Test/Test";
function App() {
// const[ signup, setSignup] = useState('');
// const[ Navigate, setNavigate] = useState('');
  // const handleChange = () => {
  //   <Signup />
  // }; 
  return (    
    <>
      <Routes >
        //Signup page
        <Route  path="/signup" element={<Signup />} />
        <Route  path="/test" element={<Test />} />
        //Login page
        <Route path="/login" element={<Login />} />
        //Chat
        <Route  path="/chat"  element={ <PrivateRoute> <Chat /> </PrivateRoute> } />
        <Route path="/" element={<PrivateRoute><Navigation/>
        </PrivateRoute>} />         
      </Routes>
    </>   
  );
}
export default App;
