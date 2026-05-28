💬 Real-Time Chat Application

A full-stack real-time chat application built using the MERN Stack, Socket.IO, and MySQL/Knex.
This application supports private messaging, group chats, online/offline status, and a modern WhatsApp-like UI.

🚀 Features
🔐 **Authentication**
User Login & Registration
JWT Authentication
Protected Routes
💬 **Private Chat**
One-to-one real-time messaging
Instant message delivery using Socket.IO
Auto-scroll to latest messages
👥 **Group Chat**
Create groups
Add multiple members
Real-time group messaging
Display sender name in group messages
Group member count
🟢 **Online / Offline Status**
Real-time user online tracking
Offline detection on disconnect
🎨 **UI Features**
WhatsApp-inspired design
Responsive layout
Scrollable chat list
Sticky logout button
Message bubbles

🛠️  **TECH STACK**
**Frontend**
React.js
React Router DOM
Socket.IO Client
CSS
**Backend**
Node.js
Express.js
Socket.IO
JWT Authentication
**Database**
MySQL
Knex.js Query Builder

📂 Project Structure
chat-application/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket.js
│   └── server.js
│
├── frontend/
│   ├── Components/
│   ├── Pages/
│   ├── services/
│   └── App.js
│
└── README.md

⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/your-username/chat-application.git
2️⃣ Install Dependencies
**Backend**
cd backend
npm install
**Frontend**
cd client
npm install

🔑 Environment Variables

Create a .env file inside backend:
PORT=8080
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=chat_app

▶️ Run Application
**Start Backend**
cd backend
npm start
**Start Frontend**
cd client
npm run dev


🌐 Socket Events
| Event               | Description              |
| ------------------- | ------------------------ |
| join                | User joins personal room |
| joinGroup           | User joins group room    |
| sendMessage         | Send private message     |
| receiveMessage      | Receive private message  |
| sendGroupMessage    | Send group message       |
| receiveGroupMessage | Receive group message    |
| userOnline          | User comes online        |
| userOffline         | User goes offline        |


🗄️ Database Tables
**users**
id
user_name
email
password
**messages**
id
sender_id
receiver_id
message
created_at
**groups**
id
group_name
created_by
created_at
**group_members**
id
group_id
user_id
**group_messages**
id
group_id
sender_id
message
created_at

📸 Screenshots
<img width="1920" height="1080" alt="Screenshot (161)" src="https://github.com/user-attachments/assets/67c652c1-077b-430e-9981-647da6cc8f74" />

