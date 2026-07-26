# Nourix AI Nutrition Planner

A full-stack AI-powered nutrition planning application with React frontend and Flask backend.

## Tech Stack

- **Frontend**: React + Vite + React Router
- **Backend**: Flask + Groq AI + Pixabay API
- **Database**: MongoDB Atlas (optional)
- **Deployment**: Vercel (frontend) + Render (backend)

## Project Structure

```
Nourix/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Flask API backend
│   ├── app.py               # Main Flask app
│   ├── services/            # AI and utility services
│   ├── models/              # Data models
│   ├── requirements.txt
│   ├── .env
│   └── Procfile
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- pip
- virtualenv (recommended)

### Setup

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd Nourix
```

**2. Backend Setup**
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

**3. Configure Environment Variables**
```bash
cp .env.example .env
# Edit .env with your API keys
```

**4. Frontend Setup**
```bash
cd frontend
npm install
```

**5. Run the Application**

**Backend (Terminal 1):**
```bash
cd backend
venv\Scripts\activate
python app.py
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
GROQ_API_KEY=your-groq-api-key
PIXABAY_API_KEY=your-pixabay-api-key
MONGODB_URI=your-mongodb-uri
PORT=5000
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/planner` - Generate meal plan
- `POST /api/generate-plan` - Generate AI meal plan
- `POST /api/chat` - AI chat assistant
- `GET /api/tips` - Get health tips

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
```

### Backend (Render)
1. Push to GitHub
2. Connect to Render
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`

## License

MIT
