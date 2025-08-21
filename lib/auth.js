import axios from 'axios'

// Utility functions for authentication

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token')
  }
  return null
}

export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token)
  }
}

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token')
  }
}

export const isAuthenticated = () => {
  return !!getAuthToken()
}

export const logout = async () => {
  try {
    // Call logout API to clear server-side session
    await axios.post('/api/auth/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Clear client-side token
    removeAuthToken()
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }
}

export const getUserData = async () => {
  const token = getAuthToken()
  if (!token) {
    throw new Error('No authentication token')
  }

  try {
    const response = await axios.get('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      removeAuthToken()
      throw new Error('Authentication failed')
    }
    throw new Error('Failed to fetch user data')
  }
}

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
})

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
) 