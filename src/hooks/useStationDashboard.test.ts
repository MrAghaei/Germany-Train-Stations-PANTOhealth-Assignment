import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useStationDashboard } from './useStationDashboard'

const mockNavigate = vi.fn()
const mockSearch = vi.fn(() => ({ city: undefined, stationId: undefined }))

vi.mock('../routes/index', () => ({
  Route: {
    useSearch: () => mockSearch(),
    fullPath: '/',
  },
}))

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('./useStations', () => ({
  useStations: () => ({
    data: [
      {
        id: 1,
        name: 'Berlin Hbf',
        city: 'Berlin',
        latitude: 52,
        longitude: 13,
      },
      {
        id: 2,
        name: 'Hamburg Hbf',
        city: 'Hamburg',
        latitude: 53,
        longitude: 10,
      },
    ],
    loading: false,
    error: null,
  }),
}))

describe('useStationDashboard Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return all stations initially', () => {
    const { result } = renderHook(() => useStationDashboard())
    expect(result.current.filteredStations).toHaveLength(2)
  })

  it('should update URL when setting city filter', () => {
    const { result } = renderHook(() => useStationDashboard())

    act(() => {
      result.current.setCityFilter('Berlin')
    })

    expect(mockNavigate).toHaveBeenCalledWith({
      search: expect.any(Function),
      replace: true,
    })
  })
})
