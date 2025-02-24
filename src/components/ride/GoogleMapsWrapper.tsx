'use client'

import { useLoadScript } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '@/config/constants'

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"]

export default function GoogleMapsWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}