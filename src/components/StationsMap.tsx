import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import type { StationModel } from '@/models/stations-model'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

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
      className="h-full w-full rounded-md z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapController selectedStation={selectedStation} />
      {stations.map((station, idx) => (
        <Marker
          eventHandlers={{
            click: () => onStationSelect(station.id),
          }}
          key={idx}
          position={[station.latitude, station.longitude]}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            {station.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
