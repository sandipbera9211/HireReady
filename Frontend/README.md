<div align="center">

# 🚀 HireReady

### *Analyse YourSelf — Your AI-powered interview preparation companion*

> Resume Analyzer · Mock Interview · Prep Plan

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-hire--ready--zeze.vercel.app-7c3aed?style=for-the-badge)](https://hire-ready-zeze.vercel.app)
[![Backend](https://img.shields.io/badge/⚙️%20Backend%20API-hire--ready--eight.vercel.app-6d28d9?style=for-the-badge)](https://hire-ready-eight.vercel.app)
[![JavaScript](https://img.shields.io/badge/JavaScript-99.7%25-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/sandipbera9211/HireReady)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

<br/>

![HireReady Dashboard Screenshot](./font-screenshot.png)

*HireReady Dashboard — AI-Powered Platform running at hire-ready-zeze.vercel.app*

</div>

---

## 📖 About

**HireReady** is a full-stack AI-powered interview preparation platform built with React and Node.js. It helps job seekers analyze their resume with AI, practice with mock interviews, and follow a personalized preparation plan — all in one place.

The tagline says it best: *"Practice, sharpen, and walk into any interview ready to own the room."*

---

## ✨ Features

### 📄 Resume Analyzer
Upload your resume and let AI dissect it. Get actionable feedback on:
- Strengths and weaknesses in your resume
- Missing keywords for your target role
- Suggestions to improve structure and impact

### 🎤 Mock Interview
Simulate a real interview experience:
- AI generates role-specific questions based on your resume
- Answer questions and receive instant AI feedback
- Improve your responses over multiple sessions

### Book 1:1 Interview
  --can book 1 to 1 interview

### 🗺️ Preparation Plan
Get a personalized roadmap:
- Study plan tailored to your target job role
- Topic-wise breakdown of what to prepare
- Track your progress as you complete milestones

### 📊 Dashboard
Your central hub:
- Overview of all your activities
- Quick access to Analyze, Mock Interview, and Prep Plan
- Guest mode supported — no sign-up required to start

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **AI Engine** | Google GROQ API |
| **Deployment** | Vercel (Frontend + Backend) |
| **Language** | JavaScript (99.7%) |

---

## 📁 Project Structure

```
HireReady/
│
├── Frontend/                  # React + Vite SPA
│   ├── public/                # Static assets
│   └── src/
│       ├── pages/
│       │   ├── Dashboard.jsx       # Main landing dashboard
│       │   ├── Analyze.jsx         # Resume upload & analysis
│       │   ├── MockInterview.jsx   # AI mock interview session
│       │   └── PreparationPlan.jsx # Personalized prep roadmap
│       ├── components/             # Reusable UI components
│       ├── App.jsx                 # Root component & routes
│       └── main.jsx                # Entry point
│
└── Backend/                   # Node.js + Express REST API
    ├── routes/                # API endpoints
    ├── controllers/           # Business logic handlers
    ├── middleware/            # Request middleware
    └── index.js               # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- **Node.js** `v18+` — [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Google GROQ API Key** — [Get on groq website]

---

### 1. Clone the Repository

```bash
git clone https://github.com/sandipbera9211/HireReady.git
cd HireReady
```

---

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend/` folder:

```env
GEMINI_API_KEY=your_groq_api_key_here
PORT=5000
```

Start the backend server:

```bash
npm start
```

> ✅ Backend API will be running at `http://localhost:5000`
> You should see: **"HireReady API is running"**

---

### 3. Setup the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file inside the `Frontend/` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

> ✅ Frontend will be running at `http://localhost:5173`

---

## 🌐 Deployment

HireReady is deployed on **Vercel** for both frontend and backend:

| Service | URL |
|---------|-----|
| 🖥️ Frontend | [hire-ready-zeze.vercel.app](https://hire-ready-zeze.vercel.app) |
| ⚙️ Backend API | [hire-ready-eight.vercel.app](https://hire-ready-eight.vercel.app) |

To deploy your own fork:

1. Push your code to GitHub
2. Import both `Frontend/` and `Backend/` folders as separate Vercel projects
3. Add environment variables in each Vercel project's settings
4. Update `VITE_API_URL` in the frontend to point to your deployed backend URL

---

## 🎨 UI Highlights

- **Dark purple gradient** theme with a sleek modern design
- Responsive navbar with: `Dashboard`, `Analyze`, `Preparation Plan`, `Mock interview`
- Hero section with animated tagline: **"Analyse YourSelf"**
- Guest-friendly — users can start without logging in
- CTA buttons: **Analyze Your Resume** and **Mock Interview**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a **Pull Request**

---

## 🐛 Roadmap

- [ ] Add user authentication (Login / Sign Up flow)
- [ ] Save interview history per user
- [ ] Export preparation plan as PDF
- [ ] Add voice-based mock interview support
- [ ] Mobile responsiveness improvements

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 👨‍💻 Author

<div align="center">

**Sandip Bera**

[![GitHub](https://img.shields.io/badge/GitHub-sandipbera9211-181717?style=for-the-badge&logo=github)](https://github.com/sandipbera9211)

</div>

---

<div align="center">

Made with ❤️ to help people **ace their interviews** 🎯

⭐ *If you found this helpful, please give it a star!* ⭐

</div>