import { useStationDashboard } from '../../hooks/useStationDashboard'
import { StationMap } from './StationsMap'
import { StationSidebar } from './StationSidebar'
import MapVisualWrapper from './MapVisualWrapper'

export default function Dashboard() {
  const {
    loading,
    error,
    cityFilter,
    filteredStations,
    selectedStation,
    setCityFilter,
    selectStation,
    handleStationSelect,
  } = useStationDashboard()

  if (error) {
    return (
      <div className="p-10 text-red-500 bg-zinc-950 h-screen">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row bg-zinc-950 text-zinc-100 selection:bg-lime-500/30 font-sans">
      <StationSidebar
        loading={loading}
        cityFilter={cityFilter}
        onSearchChange={setCityFilter}
        stations={filteredStations}
        selectedId={selectedStation?.id}
        onSelect={selectStation}
      />

      <MapVisualWrapper>
        <StationMap
          stations={filteredStations}
          selectedStation={selectedStation}
          onStationSelect={handleStationSelect}
        />
      </MapVisualWrapper>
    </div>
  )
}
