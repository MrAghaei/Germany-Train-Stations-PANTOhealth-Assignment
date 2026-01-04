import type { StationModel } from '@/models/stations-model'
import { useState, useEffect } from 'react'

const API_URL =
  'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw'

export const useStations = () => {
  const [data, setData] = useState<StationModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Failed to fetch stations')
        const json = await response.json()
        const normalizedData = json.map((station: any) => ({
          id: station.id,
          name: station.name,
          city: station.city,
          latitude: station.lat,
          longitude: station.lng,
        }))
        setData(normalizedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
