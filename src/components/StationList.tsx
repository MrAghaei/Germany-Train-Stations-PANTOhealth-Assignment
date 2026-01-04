import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import type { StationModel } from '@/models/stations-model'

interface StationListProps {
  stations: StationModel[]
  selectedId?: number
  onSelect: (id: number) => void
}

export function StationList({
  stations,
  selectedId,
  onSelect,
}: StationListProps) {
  if (stations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center mt-4">
        No stations found.
      </p>
    )
  }

  return (
    <div className="space-y-2 pr-4">
      {stations.map((station) => (
        <Card
          key={station.id}
          className={`cursor-pointer transition-colors hover:bg-accent ${
            selectedId === station.id ? 'border-primary bg-accent' : ''
          }`}
          onClick={() => onSelect(station.id)}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">
              {station.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{station.city}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
