import { useState } from 'react'
import axios from 'axios'
import './Planner.css'

function Planner() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activity_level: 'moderately_active',
    goal: 'maintain',
    diet_type: 'balanced'
  })
  
  const [mealPlan, setMealPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMealPlan(null)

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height)
      }

      const response = await axios.post('/api/planner', payload)
      setMealPlan(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate meal plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="planner">
      <div className="container">
        <h1>AI Nutrition Planner</h1>
        
        <div className="planner-content">
          <form onSubmit={handleSubmit} className="planner-form">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Activity Level</label>
              <select name="activity_level" value={formData.activity_level} onChange={handleChange}>
                <option value="sedentary">Sedentary</option>
                <option value="lightly_active">Lightly Active</option>
                <option value="moderately_active">Moderately Active</option>
                <option value="very_active">Very Active</option>
                <option value="extra_active">Extra Active</option>
              </select>
            </div>

            <div className="form-group">
              <label>Goal</label>
              <select name="goal" value={formData.goal} onChange={handleChange}>
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>

            <div className="form-group">
              <label>Diet Type</label>
              <select name="diet_type" value={formData.diet_type} onChange={handleChange}>
                <option value="balanced">Balanced</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Generating Plan...' : 'Generate Meal Plan'}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}

          {mealPlan && (
            <div className="meal-plan-result">
              <h2>Your Personalized Meal Plan</h2>
              <div className="stats">
                <div className="stat">
                  <span className="stat-label">BMI</span>
                  <span className="stat-value">{mealPlan.bmi}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Daily Calories</span>
                  <span className="stat-value">{mealPlan.daily_calories}</span>
                </div>
              </div>

              <div className="meals">
                {Object.entries(mealPlan.meals).map(([meal, description]) => (
                  <div key={meal} className="meal-card">
                    <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>

              {mealPlan.recommendations && (
                <div className="recommendations">
                  <h3>Recommendations</h3>
                  <ul>
                    {mealPlan.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Planner
