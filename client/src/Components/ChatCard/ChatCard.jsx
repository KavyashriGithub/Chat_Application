import React from "react";
import "./ChatCard.css";
function ChatCard({ user, handleUserClick }) {
  return (
    <div className="chat-card" onClick={() => handleUserClick(user)}>
      <p>{user.user_name}</p>

        {user.online ? (
    <span className="online">● Online</span>
  ) : (
    <span className="offline">● Offline</span>
  )}
    </div>



  );
}
export default ChatCard;