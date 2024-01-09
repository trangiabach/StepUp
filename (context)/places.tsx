import { Types } from '(types)'
import { children } from 'cheerio/lib/api/traversing'
import useFetch from 'http-react'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

interface PlacesContextProviderProps extends PropsWithChildren {}

interface PlacesProviderProps {
  places: Types.Place[]
  isLoading: boolean
  selectedPlaceType: string | null
  setSelectedPlaceType: (type: string) => void
  resetToAllPlaces: () => void
}

const defaultPlacesProviderValue: PlacesProviderProps = {
  places: [],
  isLoading: false,
  selectedPlaceType: null,
  setSelectedPlaceType: () => null,
  resetToAllPlaces: () => null
}

const PlacesProvider = createContext<PlacesProviderProps>(
  defaultPlacesProviderValue
)

export const PlacesContextProvider: React.FC<PlacesContextProviderProps> = ({
  children
}) => {
  const { data: allPlaces, loading: isPlacesLoading } =
    useFetch<Types.Place[]>('/places')

  const [places, setPlaces] = useState<Types.Place[]>([])

  const [selectedPlaceType, setSelectedPlaceType] = useState<string | null>(
    null
  )

  const resetToAllPlaces = useCallback(() => {
    setPlaces(allPlaces)
    setSelectedPlaceType(null)
  }, [allPlaces, selectedPlaceType])

  useEffect(() => {
    if (allPlaces) {
      setPlaces(allPlaces)
    }
  }, [allPlaces])

  useEffect(() => {
    if (selectedPlaceType) {
      const filteredPlaces = allPlaces.filter(
        place => place.type === selectedPlaceType
      )
      setPlaces(filteredPlaces)
    } else if (allPlaces) {
      setPlaces(allPlaces)
      setSelectedPlaceType(null)
    }
  }, [selectedPlaceType])

  const value = useMemo(
    () => ({
      places,
      isLoading: isPlacesLoading,
      selectedPlaceType,
      setSelectedPlaceType,
      resetToAllPlaces
    }),
    [places, isPlacesLoading, selectedPlaceType, resetToAllPlaces]
  )

  return (
    <PlacesProvider.Provider value={value}>{children}</PlacesProvider.Provider>
  )
}

export const usePlaces = () => useContext<PlacesProviderProps>(PlacesProvider)
