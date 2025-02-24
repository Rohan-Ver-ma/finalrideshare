'use client'

import { useState } from 'react'
import LocationSearch from './LocationSearch'
import RideMap from './RideMap'
import GoogleMapsWrapper from './GoogleMapsWrapper'

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface MapLocation {
  lat: number;
  lng: number;
}

interface RideType {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  basePrice: number;
}

const RIDE_TYPES: RideType[] = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Affordable, shared rides',
    multiplier: 12,  // ₹12 per km
    basePrice: 30    // ₹30 base fare
  },
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'Standard cars, more space',
    multiplier: 15,  // ₹15 per km
    basePrice: 40    // ₹40 base fare
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Luxury vehicles, top-rated drivers',
    multiplier: 20,  // ₹20 per km
    basePrice: 50    // ₹50 base fare
  }
]

export default function RideBooking() {
  const [pickup, setPickup] = useState<Partial<Location>>({ address: '' })
  const [destination, setDestination] = useState<Partial<Location>>({ address: '' })
  const [selectedRideType, setSelectedRideType] = useState<string>('economy')
  const [estimatedFare, setEstimatedFare] = useState<number>(0)
  const [mapLocations, setMapLocations] = useState<{
    pickup: MapLocation | null;
    destination: MapLocation | null;
  }>({
    pickup: null,
    destination: null
  })

  const isPeakHour = () => {
    const hour = new Date().getHours()
    return (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19)
  }

  const calculateFare = async (pickup: MapLocation, destination: MapLocation, rideType: string) => {
    const selectedRide = RIDE_TYPES.find(ride => ride.id === rideType)
    if (!selectedRide) return 0

    if (window.google) {
      const service = new google.maps.DistanceMatrixService()
      try {
        const response = await service.getDistanceMatrix({
          origins: [pickup],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
        })

        if (response.rows[0].elements[0].status === 'OK') {
          const distanceInKm = response.rows[0].elements[0].distance.value / 1000
          const timeInMinutes = response.rows[0].elements[0].duration.value / 60
          
          const baseFare = selectedRide.basePrice
          const distanceCharge = distanceInKm * selectedRide.multiplier
          const timeCharge = timeInMinutes * 0.5  // ₹0.5 per minute
          const peakHourCharge = isPeakHour() ? baseFare * 0.2 : 0
          
          return Math.round(baseFare + distanceCharge + timeCharge + peakHourCharge)
        }
      } catch (error) {
        console.error('Error calculating distance:', error)
      }
    }
    return selectedRide.basePrice
  }

  const handleLocationSelect = async (type: 'pickup' | 'destination', location: Location) => {
    if (type === 'pickup') {
      setPickup(location)
      setMapLocations(prev => ({
        ...prev,
        pickup: { lat: location.lat, lng: location.lng }
      }))
    } else {
      setDestination(location)
      setMapLocations(prev => ({
        ...prev,
        destination: { lat: location.lat, lng: location.lng }
      }))
    }

    const newPickup = type === 'pickup' ? location : pickup
    const newDestination = type === 'destination' ? location : destination

    if (newPickup.lat && newPickup.lng && newDestination.lat && newDestination.lng) {
      const fare = await calculateFare(
        { lat: newPickup.lat, lng: newPickup.lng },
        { lat: newDestination.lat, lng: newDestination.lng },
        selectedRideType
      )
      setEstimatedFare(fare)
    }
  }

  const handleLocationClear = (type: 'pickup' | 'destination') => {
    if (type === 'pickup') {
      setPickup({ address: '' })
      setMapLocations(prev => ({
        ...prev,
        pickup: null
      }))
    } else {
      setDestination({ address: '' })
      setMapLocations(prev => ({
        ...prev,
        destination: null
      }))
    }
    setEstimatedFare(0)
  }

  const isBookingEnabled = (): boolean => {
    return Boolean(
      mapLocations.pickup &&
      mapLocations.destination &&
      pickup.address &&
      destination.address
    )
  }

  return (
    <GoogleMapsWrapper>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Map Section */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <RideMap
            pickup={mapLocations.pickup}
            destination={mapLocations.destination}
          />
        </div>

        {/* Location Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Location
            </label>
            <LocationSearch
              placeholder="Enter pickup location"
              value={pickup.address}
              onSelect={(location) => handleLocationSelect('pickup', location as Location)}
              onClear={() => handleLocationClear('pickup')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <LocationSearch
              placeholder="Enter destination"
              value={destination.address}
              onSelect={(location) => handleLocationSelect('destination', location as Location)}
              onClear={() => handleLocationClear('destination')}
            />
          </div>
        </div>

        {/* Ride Types */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Select Ride Type</h3>
          <div className="space-y-2">
            {RIDE_TYPES.map((ride) => (
              <div
                key={ride.id}
                className={`p-4 border rounded cursor-pointer transition-colors ${
                  selectedRideType === ride.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={async () => {
                  setSelectedRideType(ride.id)
                  if (pickup.lat && pickup.lng && destination.lat && destination.lng) {
                    const fare = await calculateFare(
                      { lat: pickup.lat, lng: pickup.lng },
                      { lat: destination.lat, lng: destination.lng },
                      ride.id
                    )
                    setEstimatedFare(fare)
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{ride.name}</h4>
                    <p className="text-sm text-gray-500">{ride.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      ₹{ride.basePrice} base fare + ₹{ride.multiplier}/km
                    </p>
                  </div>
                  {estimatedFare > 0 && selectedRideType === ride.id && (
                    <div className="text-lg font-semibold">
                      ₹{estimatedFare}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isPeakHour() && (
            <p className="text-sm text-orange-600 mt-2">
              *Peak hour surcharge of 20% applies
            </p>
          )}
        </div>

        {/* Estimated Fare */}
        {estimatedFare > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-semibold mb-2">Estimated Fare</h3>
            <p className="text-2xl font-bold">₹{estimatedFare.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              Final fare may vary based on traffic and other factors
            </p>
          </div>
        )}

        {/* Book Button */}
        <button
          className={`w-full py-3 rounded-lg text-white font-medium ${
            isBookingEnabled()
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!isBookingEnabled()}
          onClick={() => {
            if (isBookingEnabled()) {
              alert('Booking confirmed! A driver will be assigned shortly.')
            }
          }}
        >
          {isBookingEnabled() ? 'Book Now' : 'Enter Pickup & Destination'}
        </button>
      </div>
    </GoogleMapsWrapper>
  )
}