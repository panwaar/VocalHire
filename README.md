# 🤖 VocalHire – AI-Powered Interview Scheduler

**VocalHire** is a full-stack AI-driven mock interview platform that schedules interviews, interacts via voice using LLMs, and delivers an engaging candidate experience — all through a beautiful dashboard.

[![VocalHire Deployed](https://img.shields.io/badge/Live-VocalHire-green?style=for-the-badge&logo=vercel)](https://vocal-hire.vercel.app/)

[![GitHub stars](https://img.shields.io/github/stars/panwaar/VocalHire?style=for-the-badge)](https://github.com/panwaar/VocalHire/stargazers)

[![GitHub forks](https://img.shields.io/github/forks/panwaar/VocalHire?style=for-the-badge)](https://github.com/panwaar/VocalHire/network)

---

## 🚀 Tech Stack

- **Frontend**: React, Next.js 14 (App Router), TailwindCSS, ShadCN/UI
- **Backend**: Supabase (Auth + Database), Firebase (Optional fallback)
- **AI Voice**: VAPI.ai for voice interactions
- **LLM**: Gemini / OpenAI (GPT-4) for question generation & conversation
- **APIs**: Google OAuth, Deepgram, Gemini API
- **Deployment**: Vercel

---

## 📊 Features

- 🔐 Google Authentication with Supabase
- 📋 Create and manage multiple interviews
- 🧠 Real-time AI voice interaction with interview questions
- 📞 Call Start/End logic with blinking indicators
- 📈 Track interview feedback and user history
- 💬 Dynamic UI with animation feedback for speaking state
- 📲 Mobile Responsive & Dark Mode Ready

---

## ✨ Screenshots

| Dashboard | Interview UI | Feedback |
|----------|-------------|----------|
| ![dashboard](https://github.com/panwaar/VocalHire/assets/ss1.png) | ![interview](https://github.com/panwaar/VocalHire/assets/ss2.png) | ![feedback](https://github.com/panwaar/VocalHire/assets/ss3.png) |

---

## 📦 Run Locally

```bash
git clone https://github.com/panwaar/VocalHire.git
cd VocalHire
npm install
npm run dev
