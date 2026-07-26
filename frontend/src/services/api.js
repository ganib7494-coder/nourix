import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

export const api = {
  health: () => axios.get(`${API_BASE}/api/health`),
  
  generatePlan: (data) => axios.post(`${API_BASE}/generate`, data),
  
  tips: () => axios.get(`${API_BASE}/api/tips`)
}

export default api
