import './Chat.css'
import React, { useEffect, useState } from 'react';
import apiClient from '../services/api'
function Chat() {

  const [users, setUsers] = useState([]);
const [message , setMessage] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/api/user/all');
      console.log(response)
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = () => {
    setMessage(message+1);
  };
  return (
    <div className='chatpage'>
        <div className='sidebar'>
      <h2>All Users</h2>
      {/* <ul>
        {users.map((user, index) => (
          <li key={index}>{user.user_name}</li>
        ))}
      </ul> */}
          {users.map((user, index) => (
        <button 
          key={index} 
          className="userButton"
          onClick={handleUserClick}
        >
          {user.user_name}
        </button>
      ))}
      </div>

      <div className='chatArea'>
<p>count:{ message }</p>

      </div>
    </div>
    
  );
}

export default Chat;