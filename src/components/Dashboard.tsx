import { useState } from 'react'
import { useStationDashboard } from '../hooks/useStationDashboard'
import { StationMap } from './StationsMap'
import { StationList } from './StationList'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronUp } from 'lucide-react'
import StationListSkeleton from './StationListSkeleton'

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

  const [isExpanded, setIsExpanded] = useState(false)

  if (error) return <div className="p-10 text-red-500">Error: {error}</div>

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row bg-background">
      {/* SIDEBAR / DRAWER */}
      <aside
        className={`
          absolute bottom-0 left-0 z-10 w-full bg-background/95 backdrop-blur shadow-[0_-5px_20px_rgba(0,0,0,0.1)] rounded-t-xl border-t
          transition-all duration-500 ease-in-out
          md:static md:h-full md:w-1/3 md:max-w-md md:rounded-none md:border-t-0 md:border-r md:shadow-none md:bg-background
          ${isExpanded ? 'h-[85vh]' : 'h-35'}
          md:h-auto
        `}
      >
        {/* MOBILE TOGGLE HANDLE */}
        {/* Only visible on mobile (md:hidden). Clickable area to toggle state. */}
        <div
          className="flex flex-col items-center justify-center w-full p-2 cursor-pointer md:hidden hover:bg-accent/50 transition-colors rounded-t-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* The Handle Bar */}
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/20 mb-1" />

          {/* The Text & Icon Hint */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {isExpanded ? 'Collapse List' : 'Expand List'}
            <ChevronUp
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <div className="flex h-full flex-col p-4 pt-0 md:pt-4 gap-4">
          {/* Header & Search */}
          <div className="shrink-0 space-y-4">
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold tracking-tight">
                German Trains 🚄
              </h1>
            </div>

            <Input
              placeholder="Filter by city..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full"
            />
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-hidden">
            {loading ? (
              <StationListSkeleton />
            ) : (
              <ScrollArea className="h-full pb-8">
                <StationList
                  stations={filteredStations}
                  selectedId={selectedStation?.id}
                  onSelect={(id) => {
                    selectStation(id)
                    if (window.innerWidth < 768) setIsExpanded(false)
                  }}
                />
              </ScrollArea>
            )}
          </div>
        </div>
      </aside>

      {/* MAP SECTION */}
      <main className="absolute inset-0 z-0 md:static md:flex-1">
        <StationMap
          stations={filteredStations}
          selectedStation={selectedStation}
          onStationSelect={handleStationSelect}
        />
      </main>
    </div>
  )
}
