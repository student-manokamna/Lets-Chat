# 🚀 Step-by-Step Deployment Guide for Vercel

Welcome! This guide will help you deploy your MERN stack application to Vercel for free. Don't worry, even if you are a beginner, just follow these steps one by one.

---

## 1️⃣ Set up MongoDB Atlas (Free Cloud Database)
Since your app is going "online," it needs an online database.
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Create a **Free Shared Cluster**.
3. Go to **Network Access** and click **"Add IP Address"** -> select **"Allow Access from Anywhere"**.
4. Go to **Database Access** and create a user (remember the password!).
5. Click **Connect** -> **Connect your application** and copy the **Connection String** (it looks like `mongodb+srv://...`).

---

## 2️⃣ Deploy the Backend
1. Go to [Vercel](https://vercel.com/) and login with GitHub.
2. Click **"Add New"** -> **"Project"**.
3. Select your repository.
4. Set **Project Name** as `lets-chat-backend`.
5. Set **Root Directory** as `backend`.
6. **Framework Preset**: Select **Other**.
7. Open **Environment Variables** and add:
   - `MONGO_URL`: (The string you copied from MongoDB Atlas)
   - `JWT_SECRET`: (Any random long string)
   - `STREAM_API_KEY`: (Your Stream API Key)
   - `STREAM_API_SECRET`: (Your Stream API Secret)
   - `GEMINI_API_KEY`: (Your Gemini API Key)
   - `PORT`: `5001`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: (Leave this for now, we will add it after the frontend is deployed)
8. Click **Deploy**. Once finished, copy your backend URL (e.g., `https://lets-chat-backend.vercel.app`).

---

## 3️⃣ Deploy the Frontend
1. Back on Vercel dashboard, click **"Add New"** -> **"Project"**.
2. Select the same repository.
3. Set **Project Name** as `lets-chat-frontend`.
4. Set **Root Directory** as `fronted`.
5. **Framework Preset**: Select **Vite**.
6. Open **Environment Variables** and add:
   - `VITE_BACKEND_URL`: (Paste your backend URL + `/api`, e.g., `https://lets-chat-backend.vercel.app/api`)
7. Click **Deploy**. Once finished, copy your frontend URL (e.g., `https://lets-chat-frontend.vercel.app`).

---

## 4️⃣ The Final Link (CORS)
Now the backend needs to know it's allowed to talk to your new frontend.
1. Go to your **Backend Project** on Vercel.
2. Go to **Settings** -> **Environment Variables**.
3. Add a new variable:
   - `FRONTEND_URL`: (Paste your frontend URL, e.g., `https://lets-chat-frontend.vercel.app`)
4. Go to **Deployments** and **Redeploy** the latest backend build so it can pick up the new variable.

---

## 🎉 Done!
Your application is now live! 🚀
- **Frontend**: `https://lets-chat-frontend.vercel.app`
- **Backend**: `https://lets-chat-backend.vercel.app`

### 💡 Pro Tip
Make sure you replace the password placeholder in your `MONGO_URL` with your actual MongoDB user password!
