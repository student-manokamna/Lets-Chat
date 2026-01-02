# 🗨️ Lets-Chat: A Modern MERN Stack Chat Application

Welcome to **Lets-Chat**, a premium messaging platform built with the MERN stack, integrated with **Google Gemini AI** for intelligent conversations and **Stream Chat SDK** for high-performance real-time messaging.

---

## ✨ Features

- **🚀 Real-time Messaging**: Blazing fast chat powered by Stream Chat SDK.
- **🤖 Gemini AI Integration**: Seamlessly talk to Google's cutting-edge AI within your chat interface.
- **🔐 Secure Authentication**: Robust user auth using JWT, Bcrypt, and Cookie-based sessions.
- **🌈 Modern UI/UX**: Sleek design built with **React**, **Tailwind CSS**, and **DaisyUI**.
- **💥 Smooth Animations**: Engaging micro-interactions powered by **Framer Motion**.
- **🌓 Theme Switching**: Customizable themes for a personalized experience.
- **📱 Fully Responsive**: Optimized for every device—from desktops to smartphones.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS & DaisyUI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Chat SDK**: Stream Chat React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI**: Google Generative AI (Gemini)
- **Messaging**: Stream Chat SDK
- **Security**: JWT & BcryptJS

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local or Atlas)
- **Stream Chat Account** (for API keys)
- **Google Cloud Console** (for Gemini API Key)

### ⚙️ Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Lets-Chat.git
   cd Lets-Chat
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../fronted
   npm install
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── controllers/  # API Logic
│   │   ├── models/       # Mongoose Schemas
│   │   ├── routes/       # API Endpoints
│   │   ├── middleware/   # Auth & Errors
│   │   └── server.js     # Entry point
│   └── db.js             # Database Connection
├── fronted/
│   ├── src/
│   │   ├── components/   # Reusable UI
│   │   ├── pages/        # Application Views
│   │   ├── store/        # Zustand State
│   │   └── lib/          # Axios & Integrations
```

---

## 📜 License
This project is licensed under the **ISC License**.

---

## 🤝 Contributing
Feel free to fork this project and submit PRs. Let's make communication better together! 🚀

---

<p align="center">Made with ❤️ for the Tech Community</p>

