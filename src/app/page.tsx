export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to RideShare
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your trusted ride-sharing platform
        </p>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg mb-4">
            Get started by logging in or creating a new account
          </p>
        </div>
      </div>
    </main>
  )
}