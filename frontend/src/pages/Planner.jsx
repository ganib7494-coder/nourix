import { useState } from 'react'
import axios from 'axios'
import './Planner.css'

function Planner() {
  const [formData, setFormData] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    cuisine: '',
    dietPreference: 'balanced',
    activityLevel: 'weight loss',
    allergies: '',
    numServings: '2',
    cookingTime: '30'
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
      const response = await axios.post('/generate', formData)
      setMealPlan(response.data)
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
            <div className="form-section">
              <h3>Breakfast</h3>
              <div className="form-group">
                <label>Breakfast Idea *</label>
                <input
                  type="text"
                  name="breakfast"
                  value={formData.breakfast}
                  onChange={handleChange}
                  placeholder="e.g., Oatmeal with berries, Scrambled Eggs"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Lunch</h3>
              <div className="form-group">
                <label>Lunch Idea *</label>
                <input
                  type="text"
                  name="lunch"
                  value={formData.lunch}
                  onChange={handleChange}
                  placeholder="e.g., Grilled Chicken Salad, Quinoa Bowl"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Dinner</h3>
              <div className="form-group">
                <label>Dinner Idea *</label>
                <input
                  type="text"
                  name="dinner"
                  value={formData.dinner}
                  onChange={handleChange}
                  placeholder="e.g., Salmon with Vegetables, Pasta"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Your Preferences</h3>
              <div className="row">
                <div className="form-group">
                  <label>Goal / Activity Level *</label>
                  <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
                    <option value="weight loss">Weight Loss</option>
                    <option value="weight gain">Weight Gain</option>
                    <option value="moderate">Moderate / Maintenance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Dietary Preference *</label>
                  <select name="dietPreference" value={formData.dietPreference} onChange={handleChange} required>
                    <option value="balanced">Balanced</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Allergies (optional)</label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="e.g., Peanuts, Dairy, Shellfish"
                  />
                </div>
                <div className="form-group">
                  <label>Cuisine Preference *</label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    placeholder="e.g., Italian, Mexican, Asian"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Servings</label>
                  <input
                    type="number"
                    name="numServings"
                    value={formData.numServings}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Max Cooking Time (min)</label>
                  <input
                    type="number"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    min="10"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Generating Plan...' : 'Generate Full Day Plan'}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}

          {mealPlan && (
            <div className="meal-plan-result">
              <h2>Your Personalized Meal Plan</h2>
              
              {mealPlan.meal_plan && (
                <div className="meals">
                  {Object.entries(mealPlan.meal_plan).map(([meal, details]) => (
                    <div key={meal} className="meal-card">
                      <div className="meal-header">
                        <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
                        {details.image_url && (
                          <img src={details.image_url} alt={details.meal_name} className="meal-image" />
                        )}
                      </div>
                      <div className="meal-details">
                        <p><strong>Meal:</strong> {details.meal_name}</p>
                        <p><strong>Calories:</strong> {details.calories}</p>
                        <p><strong>Protein:</strong> {details.protein}</p>
                        <p><strong>Carbs:</strong> {details.carbs}</p>
                        <p><strong>Fat:</strong> {details.fat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mealPlan.ingredients_table && mealPlan.ingredients_table.length > 0 && (
                <div className="card">
                  <h3>Ingredients</h3>
                  <table className="ingredients-table">
                    <thead>
                      <tr>
                        <th>Ingredient</th>
                        <th>Quantity</th>
                        <th>Benefit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mealPlan.ingredients_table.map((item, i) => (
                        <tr key={i}>
                          <td>{item.ingredient}</td>
                          <td>{item.quantity}</td>
                          <td>{item.benefit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {mealPlan.cooking_steps && mealPlan.cooking_steps.length > 0 && (
                <div className="card">
                  <h3>Cooking Steps</h3>
                  <ol className="steps-list">
                    {mealPlan.cooking_steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {mealPlan.ai_nutrition_tips && mealPlan.ai_nutrition_tips.length > 0 && (
                <div className="card">
                  <h3>AI Nutrition Tips</h3>
                  <ul className="tips-list">
                    {mealPlan.ai_nutrition_tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {mealPlan.health_benefits && mealPlan.health_benefits.length > 0 && (
                <div className="card">
                  <h3>Health Benefits</h3>
                  <ul className="benefits-list">
                    {mealPlan.health_benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {mealPlan.daily_nutrition_summary && (
                <div className="card summary-card">
                  <h3>Daily Nutrition Summary</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="label">Calories</span>
                      <span className="value">{mealPlan.daily_nutrition_summary.calories}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Protein</span>
                      <span className="value">{mealPlan.daily_nutrition_summary.protein}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Carbs</span>
                      <span className="value">{mealPlan.daily_nutrition_summary.carbohydrates}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Fat</span>
                      <span className="value">{mealPlan.daily_nutrition_summary.fat}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Fiber</span>
                      <span className="value">{mealPlan.daily_nutrition_summary.fiber}</span>
                    </div>
                  </div>
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
