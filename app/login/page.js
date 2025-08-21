'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Button from '@/components/Buttons/Button'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setErrors({})
    
    try {
      const response = await axios.post('/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Store token in localStorage for client-side access
      localStorage.setItem('auth-token', response.data.token)
      
      // Redirect to dashboard after successful login
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Login error:', error)
      
      // Handle axios error response
      if (error.response) {
        // Server responded with error status
        setErrors({ general: error.response.data.error || 'Login failed. Please try again.' })
      } else if (error.request) {
        // Request was made but no response received
        setErrors({ general: 'Network error. Please check your connection.' })
      } else {
        // Something else happened
        setErrors({ general: error.message || 'Login failed. Please try again.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-linen to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-nicholas text-MidnightGreen mb-2">
            Welcome Back
          </h1>
          <p className="text-grey text-lg font-ptSansPro">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-MidnightGreen mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-grey" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green/20 transition-all ${
                    errors.email 
                      ? 'border-popstar focus:border-popstar' 
                      : 'border-grey/30 focus:border-green'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-popstar">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-MidnightGreen mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-grey" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green/20 transition-all ${
                    errors.password 
                      ? 'border-popstar focus:border-popstar' 
                      : 'border-grey/30 focus:border-green'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-grey hover:text-MidnightGreen transition-colors" />
                  ) : (
                    <FiEye className="h-5 w-5 text-grey hover:text-MidnightGreen transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-popstar">{errors.password}</p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-popstar/10 border border-popstar/20 rounded-xl p-3">
                <p className="text-sm text-popstar">{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              className="mt-6 text-white"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-grey">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-green hover:text-MidnightGreen font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 