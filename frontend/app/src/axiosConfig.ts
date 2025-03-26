import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')
    if (token && client && uid) {
      config.headers['access-token'] = token
      config.headers.client = client
      config.headers.uid = uid
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
