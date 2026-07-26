import axios from 'axios'

const API_BASE = '/api'

export const api = {
  health: () => axios.get(`${API_BASE}/health`),
  
  generatePlan: (data) => axios.post('/generate', data),
  
  tips: () => axios.get(`${API_BASE}/tips`)
}

export default api
