'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')  // Add success state
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')  // Clear any previous success message

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log('Login response:', data)

      if (response.status === 200) {
        // Store the data
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))
        
        // Show success message
        setSuccess('Login successful! Redirecting to dashboard...')
        
        // Delay redirect for 1.5 seconds
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1500)
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {success}
        </div>
      )}
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button 
        type="submit" 
        disabled={loading}
        className={`w-full p-2 rounded text-white ${
          loading 
            ? 'bg-blue-300 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Test credentials */}
      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <p className="font-semibold">Test Credentials:</p>
        <p>Username: michaelw</p>
        <p>Password: michaelwpass</p>
      </div>
    </form>
  )
}