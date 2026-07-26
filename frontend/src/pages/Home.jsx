import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Nourix AI Nutrition Planner</h1>
          <p className="hero-subtitle">
            Your personal AI-powered nutrition assistant for healthier living
          </p>
          <div className="hero-buttons">
            <Link to="/planner" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🥗 AI Meal Planning</h3>
              <p>Get personalized meal plans based on your goals and preferences</p>
            </div>
            <div className="feature-card">
              <h3>💪 Calorie Tracking</h3>
              <p>Track your daily intake with our smart calculator</p>
            </div>
            <div className="feature-card">
              <h3>🤖 AI Chatbot</h3>
              <p>Ask questions about nutrition and get instant advice</p>
            </div>
            <div className="feature-card">
              <h3>📊 Health Insights</h3>
              <p>Monitor your progress with detailed analytics</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
