'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-8">
          <Link 
            href="/dashboard"
            className={`py-4 px-3 text-sm font-medium border-b-2 ${
              pathname === '/dashboard' 
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Book Ride
          </Link>
          <Link 
            href="/dashboard/history"
            className={`py-4 px-3 text-sm font-medium border-b-2 ${
              pathname === '/dashboard/history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ride History
          </Link>
          <Link 
            href="/dashboard/profile"
            className={`py-4 px-3 text-sm font-medium border-b-2 ${
              pathname === '/dashboard/profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}