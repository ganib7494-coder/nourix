import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Nourix</h3>
            <p>AI-powered nutrition planning for a healthier you.</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <Link to="/">Home</Link>
            <Link to="/planner">Planner</Link>
            <Link to="/health">Health Tips</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>support@nourix.ai</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p> 2025 Nourix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
