import './About.css'

function About() {
  return (
    <div className="about">
      <div className="container">
        <h1>About Nourix</h1>
        
        <div className="about-content">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              Nourix is an AI-powered nutrition planner designed to help you achieve your health goals 
              through personalized meal plans, real-time nutrition advice, and intelligent recommendations.
            </p>
          </div>

          <div className="about-card">
            <h2>How It Works</h2>
            <p>
              Our AI analyzes your personal data including age, weight, height, activity level, and goals 
              to create tailored meal plans that fit your lifestyle.
            </p>
          </div>

          <div className="about-card">
            <h2>Technology Stack</h2>
            <ul>
              <li>React + Vite for the frontend</li>
              <li>Flask for the backend API</li>
              <li>Groq AI for intelligent recommendations</li>
              <li>MongoDB for data storage</li>
            </ul>
          </div>

          <div className="about-card">
            <h2>Contact</h2>
            <p>
              Have questions or feedback? Reach out to us!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
