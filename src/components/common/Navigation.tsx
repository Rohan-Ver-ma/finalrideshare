'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md mb-6 dark:bg-black dark:text-gray-50" >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-8">
          <Link 
            href="/dashboard"
            className={`py-4 px-3 text-sm font-medium border-b-2 dark:text-gray-50 ${
              pathname === '/dashboard' 
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Book Ride
          </Link>
          <Link 
            href="/dashboard/history"
            className={`py-4 px-3 text-sm font-medium border-b-2 dark:text-gray-50 ${
              pathname === '/dashboard/history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ride History
          </Link>
          <Link 
            href="/dashboard/profile"
            className={`py-4 px-3 text-sm font-medium border-b-2 dark:text-gray-50 ${
              pathname === '/dashboard/profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </Link>
          <Link 
            href="/dashboard/payment"
            className={`py-4 px-3 text-sm font-medium border-b-2 dark:text-gray-50 ${
              pathname === '/dashboard/payment'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment
          </Link>
          <Link 
            href="/dashboard/shared-rides"
            className={`py-4 px-3 text-sm font-medium border-b-2 dark:text-gray-50  ${
              pathname === '/dashboard/shared-rides'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Shared Rides
          </Link>
          <Link
           href="/dashboard/chat"
           className={`py-4 px-3 text-sm font-medium border-b-2 dark:text-gray-50 ${
            pathname === '/dashboard/chat'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
           >
          Chat</Link>
        </div>
      </div>
    </nav>
  )
}