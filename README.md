# ETGen - AI Powered Stock Intelligence Platform
🚀 **Live Demo:** https://etgen-lake.vercel.app/
# Overview
ETGen is a full-stack AI-powered stock intelligence platform that provides investors with real-time market insights, AI-generated stock analysis, portfolio recommendations, and an intelligent financial assistant.

The platform combines technical indicators, market sentiment, historical data, and Gemini AI to generate actionable Buy/Hold/Sell recommendations.

---

## Features

- AI-powered stock analysis
- Real-time Buy/Hold/Sell recommendations
- Portfolio analysis
- Interactive AI financial assistant
- Market overview dashboard
- Signal details with technical indicators
- Responsive modern UI
- REST API backend

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Python
- FastAPI
- Gemini AI
- REST APIs

---

## Folder Structure

```

ETGen/
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ └── services/
│
├── backend/
│ ├── agents/
│ ├── models/
│ ├── services/
│ ├── data/
│ └── main.py

```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/hackerriddhi/ETGen.git
cd ETGen
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs at

```
http://localhost:8000
```

---

## Environment Variables

### Frontend

```
VITE_API_URL=https://etgenbackend.onrender.com/api
```

### Backend

```
PORT=5000

MONGODB_URI=your_connection_string

JWT_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```


---

## Future Improvements

- User authentication
- Live stock market streaming
- Watchlist support
- Historical portfolio tracking
- Dark/Light theme
- News sentiment analysis

---

