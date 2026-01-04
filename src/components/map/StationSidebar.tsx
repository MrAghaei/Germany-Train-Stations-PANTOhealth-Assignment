import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronUp } from 'lucide-react'
import { StationList } from './StationList'
import StationListSkeleton from './StationListSkeleton'
import type { StationModel } from '@/models/stations-model'
import Logo from '../Logo'

interface StationSidebarProps {
  loading: boolean
  cityFilter: string
  onSearchChange: (val: string) => void
  stations: StationModel[]
  selectedId?: number
  onSelect: (id: number) => void
}

export function StationSidebar({
  loading,
  cityFilter,
  onSearchChange,
  stations,
  selectedId,
  onSelect,
}: StationSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSelect = (id: number) => {
    onSelect(id)
    if (window.innerWidth < 768) setIsExpanded(false)
  }

  return (
    <aside
      className={`
        absolute bottom-0 left-0 z-20 w-full bg-zinc-900/95 backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.6)] rounded-t-[2rem] border-t border-zinc-800/50
        transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
        md:static md:h-full md:w-1/3 md:max-w-md md:rounded-none md:border-t-0 md:border-r md:border-zinc-800 md:shadow-xl md:bg-zinc-900
        ${isExpanded ? 'h-[85vh]' : 'h-40'} md:h-auto
      `}
    >
      {/* Mobile Handle */}
      <div
        className="flex flex-col items-center justify-center w-full pt-3 pb-2 cursor-pointer md:hidden group rounded-t-[2rem]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="h-1.5 w-16 rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-colors mb-2" />
        <div className="flex items-center gap-1.5 text-[0.65rem] text-zinc-400 font-bold uppercase tracking-[0.15em]">
          {isExpanded ? 'Collapse' : 'Expand'}
          <ChevronUp
            className={`h-3.5 w-3.5 text-lime-400 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex h-full flex-col p-6 pt-2 md:pt-8 gap-6">
        <div className="shrink-0 space-y-6">
          <div className="hidden md:block">
            <h1 className="flex gap-4 items-center text-3xl font-extrabold tracking-tight text-white bg-linear-to-br from-white to-zinc-400 bg-clip-text">
              Germany Train Stations <Logo />
            </h1>
          </div>

          <Input
            placeholder="Filter by city..."
            value={cityFilter}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="w-full bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-lime-400/30 focus-visible:border-lime-400/50 rounded-xl h-12 text-base shadow-sm transition-all"
          />
        </div>

        <div className="flex-1 overflow-hidden rounded-xl bg-zinc-800/20 border border-zinc-800/30 shadow-inner">
          {loading ? (
            <div className="p-4">
              <StationListSkeleton />
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="p-4 pb-20 md:pb-4">
                <StationList
                  stations={stations}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                />
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </aside>
  )
}
