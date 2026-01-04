import { createFileRoute } from '@tanstack/react-router'
import { stationSearchSchema } from '@/schemas/stationSearch-schema'
import Dashboard from '@/components/map/Dashboard'

export const Route = createFileRoute('/')({
  validateSearch: (search) => stationSearchSchema.parse(search),
  component: Dashboard,
})
