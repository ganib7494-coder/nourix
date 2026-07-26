import axios from 'axios'

const API_BASE = '/api'

export const api = {
  health: () => axios.get(`${API_BASE}/health`),
  
  planner: (data) => axios.post(`${API_BASE}/planner`, data),
  
  chat: (message, context = '') => 
    axios.post(`${API_BASE}/chat`, { message, context }),
  
  tips: () => axios.get(`${API_BASE}/tips`),
  
  mealPlan: (data) => axios.post(`${API_BASE}/planner`, data)
}

export default api
