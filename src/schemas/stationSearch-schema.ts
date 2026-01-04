import z from 'zod'

export const stationSearchSchema = z.object({
  city: z.string().optional(),
  stationId: z.number().optional(),
})
