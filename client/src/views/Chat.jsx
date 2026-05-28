import "./Chat.css";
import React, { useEffect, useState, useRef, use } from "react";
import apiClient from "../services/api";
import ChatCard from "../Components/ChatCard/ChatCard";
import GroupCard from "../Components/GroupCard/GroupCard";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-feather";

const socket = io("http://localhost:8080");

function Chat() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [showMembers, setShowMembers] = useState(false);
const [groupMembers, setGroupMembers] = useState([]);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).userId;
  // const groupuserId = JSON.parse(atob(token.split(".")[1])).groupuserId;
  // SOCKET + INITIAL LOAD
  useEffect(() => {
    // fetch users and groups only once
    fetchUsers();
    fetchGroups();
    // join private room
    console.log("joining socket with",userId)
    socket.emit("join", userId);
  }, []);
  useEffect(() => {
    // join group room when group selected
    if (selectedGroup) {
      socket.emit("joinGroup", selectedGroup.id);
    }
    const handlePrivateMessage = (data) => {
      // ignore group messages
  if (data.groupId || data.group_id) return;

   // ensure we are in private chat
  if (!selectedUser) return;
      if (
        selectedUser &&
        (data.senderId === selectedUser.id ||
          data.receiverId === selectedUser.id)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };
    const handleGroupMessage = (data) => {

  // ensure we are in group chat
  if (!selectedGroup) return;
      //  if (data.type !== "group") return;
      if (selectedGroup && data.group_id === selectedGroup.id) {
        setMessages((prev) => [...prev, data]);
      }
    };
    socket.on("receiveMessage", handlePrivateMessage);
    socket.on("receiveGroupMessage", handleGroupMessage);
    return () => {
      socket.off("receiveMessage", handlePrivateMessage);
      socket.off("receiveGroupMessage", handleGroupMessage);
    };
  }, [selectedUser, selectedGroup]);

useEffect(() => {

  setUsers(prevUsers =>
    prevUsers.map(user => ({
      ...user,
      online: onlineUsers.includes(String(user.id))
    }))
  );

}, [onlineUsers]);

  useEffect(() => {
    socket.on("userOnline", (userId) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, online: true } : user,
        ),
      );
      // update selected user
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser((prev) => ({ ...prev, online: true }));
      }
    });
    socket.on("userOffline", (userId) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, online: false } : user,
        ),
      );
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser((prev) => ({ ...prev, online: false }));
      }
    });

    return () => {
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, [selectedUser]);


  useEffect(() => {

  socket.on("onlineUsers", (onlineList) => {
    console.log("Online list from server:", onlineList);

    setUsers(prevUsers =>
      prevUsers.map(user => ({
        ...user,
        online: onlineList.includes(user.id)
      }))
    );
  });

  return () => {
    socket.off("onlineUsers");
  };

}, []);
  // AUTO SCROLL

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FETCH USERS

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/api/user/all");
      console.log("response-->",response)
   const filteredUser  =response.data.filter((u) => u.id !== userId);
 setUsers(filteredUser)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // FETCH GROUPS

  const fetchGroups = async () => {
    try {
      const response = await apiClient.get("/api/groups/all");
      console.log("Fetched groups:", response.data);
      setGroups(response.data);
    } catch (error) {
      console.log("Error fetching groups:", error);
    }
  };
  // FETCH PRIVATE MESSAGES
  // const fetchMessages = async (friendId) => {
  //   try {
  //     const response = await apiClient.get(`/api/groups/messages/${friendId}`);
  //     setMessages(response.data);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };

  // USER CLICK
  const handleUserClick = async (user) => {
    setMessages([]);
    setSelectedGroup(null);
    setSelectedUser(user);

      try {
    const res = await apiClient.get(`/api/messages/${user.id}`);
    setMessages(res.data);
  } catch (err) {
    console.error("Error fetching private messages:", err);
  }
  };
  // GROUP CLICK
  const handleGroupClick = async (group) => {
    setMessages([]);
    setSelectedUser(null);
    setSelectedGroup(group);
    setShowMembers(false);
    setGroupMembers([]);
    socket.emit("joinGroup", group.id);
    const res = await apiClient.get(`/api/groups/messages/${group.id}`);
    console.log("Group messages:", res.data);
    setMessages(res.data);
  };

const handleToggleMembers = async () => {
 
  if (!selectedGroup) return;

  // toggle
  setShowMembers(!showMembers);

  // fetch only first time
  if (!showMembers) {
    try {
      const res = await apiClient.get(
        `/api/groups/members/${selectedGroup.id}`
      );
       console.log("Members API response:", res.data);
      setGroupMembers(res.data);
    } catch (err) {
      console.log(err);
    }

  }
};

  // SEND MESSAGE
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // PRIVATE MESSAGE
    if (selectedUser) {
      const messageData = {
        senderId: userId,
        receiverId: selectedUser.id,
        message: newMessage.trim(),
      };
      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
    }
    // GROUP MESSAGE
    if (selectedGroup) {
      const groupMessageData = {
        senderId: userId,
        groupId: selectedGroup.id,
        userId: userId,
        message: newMessage.trim(),
      };
      socket.emit("sendGroupMessage", groupMessageData);
      // setMessages((prev) => [...prev, groupMessageData]);
    }
    setNewMessage("");
  };
  // ENTER KEY
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // CREATE GROUP
  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedMembers.length === 0) {
      alert("Enter group name and select members");
      return;
    }
    try {
      await apiClient.post("/api/groups/create", {
        groupName,
        //  createdBy: userId,
        members: selectedMembers,
      });
      alert("Group created successfully");
      setShowGroupModal(false);
      setGroupName("");
      setSelectedMembers([]);
      fetchGroups();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };
  // LOGOUT
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // UI
  return (
    <div className="chatpage">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="top">
          <h2>Chats</h2>
          <PlusCircle
            style={{ cursor: "pointer" }}
            onClick={() => setShowGroupModal(true)}
          />
        </div>
        <div className="scrollChatList">
        {users.map((user) => (
         
         <ChatCard
            key={user.id}
            handleUserClick={handleUserClick}
            user={user}
          />
        ))}
        <h2>Groups</h2>
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            handleGroupClick={handleGroupClick}
            group={group}
          />
        ))}
</div>
        <button className="logoutBtn" onClick={handlelogout}>Logout</button>
      </div>
      {/* CHAT AREA */}
      <div className="chatArea">
        {selectedUser || selectedGroup ? (
          <>
            <div className="chatHeader">
              <div  className="groupHeader" style={{ cursor: "pointer" }} onClick={handleToggleMembers}>
  <h3>
  {selectedUser
    ? selectedUser.user_name
    : `${selectedGroup.group_name} `}
</h3>
  {selectedGroup && (
    <p className="memberCount">
      {selectedGroup.member_count} members
    </p>
  )}
</div>
{showMembers && selectedGroup && (
  <div className="groupMembersBox">
    <h4>Members</h4>

    {groupMembers.map((member) => (
      <div key={member.id}>
        {member.user_name}
      </div>
    ))}
  </div>
)}

              {/* ONLINE STATUS */}
              {selectedUser && (
                <span className={selectedUser.online ? "online" : "offline"}>
                  {selectedUser.online ? "Online" : "Offline"}
                </span>
              )}
            </div>
            <div className="messagesContainer">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.senderId === userId || msg.sender_id === userId
                      ? "myMessage"
                      : "friendMessage"
                  }
                >
                  {selectedGroup && (
                    <div className="senderName">{msg.sender_name}</div>
                  )}
                  {msg.message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="messageInputArea">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
              />
              <button className="sendButton" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="emptyChat">
            <h3>Select a user or group to start chatting</h3>
          </div>
        )}
      </div>
      {/* CREATE GROUP MODAL */}
      {showGroupModal && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h3>Create Group</h3>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="userList">
              {users.map((user) => (
                <div key={user.id}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers([...selectedMembers, user.id]);
                      } else {
                        setSelectedMembers(
                          selectedMembers.filter((id) => id !== user.id),
                        );
                      }
                    }}
                  />
                  {user.user_name}
                </div>
              ))}
            </div>
            <div className="modalButtons">
              <button onClick={handleCreateGroup}>Create</button>
              <button onClick={() => setShowGroupModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
