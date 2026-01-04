import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'
import type { StationModel } from '@/models/stations-model'

const modernIcon = L.divIcon({
  className: '!bg-transparent !border-none',
  html: `<div class="group relative flex h-7.5 w-7.5 items-center justify-center transition-transform duration-300 hover:scale-110">
           <div class="absolute inset-0 rounded-full bg-lime-500/40 animate-ping opacity-75"></div>
           <div class="relative flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.9)] ring-2 ring-black/80 z-10">
           </div>
         </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
})

function MapController({
  selectedStation,
}: {
  selectedStation: StationModel | null
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedStation) {
      map.setView([selectedStation.latitude, selectedStation.longitude], 15, {
        animate: true,
        duration: 1.5,
        easeLinearity: 0.25,
      })
    }
  }, [selectedStation, map])

  return null
}

export function StationMap({
  stations,
  selectedStation,
  onStationSelect,
}: {
  stations: StationModel[]
  selectedStation: StationModel | null
  onStationSelect: (id: number) => void
}) {
  const defaultCenter: [number, number] = [51.1657, 10.4515]

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      className="h-full w-full z-0 bg-zinc-950"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={20}
        subdomains="abcd"
      />
      <MapController selectedStation={selectedStation} />
      {stations.map((station, idx) => (
        <Marker
          icon={modernIcon}
          eventHandlers={{
            click: () => onStationSelect(station.id),
          }}
          key={idx}
          position={[station.latitude, station.longitude]}
          opacity={
            selectedStation && selectedStation.id !== station.id ? 0.6 : 1
          }
        >
          <Popup className="custom-popup">
            <div className="p-1">
              <strong className="block text-sm font-bold text-zinc-900">
                {station.name}
              </strong>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                {station.city}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
