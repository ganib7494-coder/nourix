import { useState } from 'react'
import axios from 'axios'
import './Health.css'

function Health() {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTips = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/tips')
      setTips(response.data.tips)
    } catch (err) {
      console.error('Failed to fetch tips')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="health">
      <div className="container">
        <h1>Health & AI Tips</h1>
        
        <div className="tips-section">
          <button onClick={fetchTips} className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Get Health Tips'}
          </button>

          {tips.length > 0 && (
            <div className="tips-grid">
              {tips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <span className="tip-icon">💡</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="info-section">
          <h2>Nutrition Basics</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>🥦 Macronutrients</h3>
              <p>Proteins, carbohydrates, and fats are essential for your body's energy and growth.</p>
            </div>
            <div className="info-card">
              <h3>💧 Hydration</h3>
              <p>Drink at least 8 glasses of water daily to keep your body hydrated.</p>
            </div>
            <div className="info-card">
              <h3>🥗 Balanced Diet</h3>
              <p>A balanced diet includes a variety of foods from all food groups.</p>
            </div>
            <div className="info-card">
              <h3>🏃 Exercise</h3>
              <p>Regular physical activity combined with good nutrition leads to better health.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Health
