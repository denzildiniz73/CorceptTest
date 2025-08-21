'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Button from '@/components/Buttons/Button'
import { FiUser, FiLogOut, FiHome, FiSettings, FiBell } from 'react-icons/fi'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth-token')
    if (!token) {
      router.push('/login')
      return
    }

    // Fetch user data
    fetchUserData(token)
  }, [router])

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setUser(response.data.user)
    } catch (error) {
      console.error('Error fetching user data:', error)
      
      if (error.response?.status === 401) {
        localStorage.removeItem('auth-token')
        router.push('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth-token')
      router.push('/login')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-linen to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-15 w-15 border-b-2 border-MidnightGreen mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-linen to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-nicholas text-MidnightGreen">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiBell className="h-5 w-5 text-grey" />
                <span className="text-sm text-grey">Notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUser className="h-5 w-5 text-grey" />
                <span className="text-sm text-grey">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <FiLogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-MidnightGreen rounded-full p-3">
              <FiUser className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-nicholas text-MidnightGreen">
                Welcome back, {user?.firstName} !
              </h2>
              <p className="text-grey mt-1">
                Here's what's happening with your account today.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-magicMint to-buff rounded-xl p-6">
              <h3 className="text-lg font-medium text-MidnightGreen mb-2">
                Account Status
              </h3>
              <p className="text-green font-semibold">Active</p>
            </div>
            <div className="bg-gradient-to-br from-lemonYellow to-buff rounded-xl p-6">
              <h3 className="text-lg font-medium text-MidnightGreen mb-2">
                Last Login
              </h3>
              <p className="text-green font-semibold">
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-buff to-magicMint rounded-xl p-6">
              <h3 className="text-lg font-medium text-MidnightGreen mb-2">
                Role
              </h3>
              <p className="text-green font-semibold capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-nicholas text-MidnightGreen mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="light-green-gradient"
              fullWidth
              className="h-16 flex items-center justify-center space-x-2"
            >
              <FiHome className="h-5 w-5" />
              <span>Go to Home</span>
            </Button>
            <Button
              variant="outline"
              fullWidth
              className="h-16 flex items-center justify-center space-x-2"
            >
              <FiSettings className="h-5 w-5" />
              <span>Settings</span>
            </Button>
            <Button
              variant="secondary"
              fullWidth
              className="h-16 flex items-center justify-center space-x-2"
            >
              <FiUser className="h-5 w-5" />
              <span>Profile</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 