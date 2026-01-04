import { useMemo } from 'react'
import { useStations } from './useStations'
import { Route } from '../routes/index'
import { useNavigate } from '@tanstack/react-router'

export function useStationDashboard() {
  const { data: stations, loading, error } = useStations()
  const navigate = useNavigate({ from: Route.fullPath })
  const { city, stationId } = Route.useSearch()

  // Derived State (The Logic)
  const selectedStation = useMemo(() => {
    return stations.find((s) => s.id === stationId) || null
  }, [stations, stationId])

  const handleStationSelect = (id: number) => {
    navigate({
      search: (old) => ({
        ...old,
        stationId: id,
      }),
      replace: true,
    })
  }

  const filteredStations = useMemo(() => {
    if (!city) return stations
    return stations.filter(
      (s) =>
        s.city.toLowerCase().includes(city.toLowerCase()) ||
        s.name.toLowerCase().includes(city.toLowerCase()),
    )
  }, [city, stations])

  // Actions (The Interactions)
  const setCityFilter = (newCity: string) => {
    navigate({
      search: (old) => ({
        ...old,
        city: newCity || undefined,
        stationId: undefined,
      }),
      replace: true,
    })
  }

  const selectStation = (id: number) => {
    navigate({
      search: (old) => ({ ...old, stationId: id }),
      replace: true,
    })
  }

  return {
    loading,
    error,
    cityFilter: city || '',
    filteredStations,
    selectedStation,
    setCityFilter,
    selectStation,
    handleStationSelect,
  }
}
