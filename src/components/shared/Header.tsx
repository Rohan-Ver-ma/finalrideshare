import Link from "next/link"

export default function Header() {
  return (
    <>
<header className="text-gray-600 body-font">
<div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
  <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
    <span className="ml-3 text-xl  font-bold">RideShare</span>
  </a>
  <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center cursor-pointer">
    <a  href="login" className="mr-5 hover:text-gray-900">Login</a>
    <a href="register" className="mr-5 hover:text-gray-900"> Register</a>
    
  </nav>
  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </button>
</div>
</header>
    </>

  )
}