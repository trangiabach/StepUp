'use client'
import { ReactNode, useEffect, useState } from 'react'
import { Map, MarkerEvent } from 'react-map-gl'
import Marker from './Marker'
import MAP from '(consts)/map'
import { Box, SxProps } from '@mui/material'
import useFetch from 'http-react'
import { Types } from '(types)'
import Popup from './Popup'
import NavBar from './NavBar'
import Loading from '(components)/common/Loading'
import { usePlaces } from '(context)/places'
import COLORS from '(consts)/colors'
import { FaStoreAlt } from 'react-icons/fa'

interface MainMapProps {
  children?: ReactNode
  places?: Types.Place
}

const mapContainerStyles: SxProps = {
  height: '100vh',
  width: '100vw'
}

const placesCountContainerStyles: SxProps = {
  position: 'fixed',
  top: '230px',
  zIndex: 10,
  color: COLORS.primary,
  backgroundColor: COLORS.white,
  left: '50%',
  transform: 'translateX(-50%)',
  paddingY: '8px',
  paddingX: '12px',
  borderRadius: '10px',
  boxShadow: '0 4px 32px rgba(0,0,0,.2)',
  fontSize: '14px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const MainMap: React.FC<MainMapProps> = ({ children }) => {
  const {
    data: mapboxAccessToken,
    loading: isTokenLoading,
    error: tokenError
  } = useFetch<string>('/secrets/mapbox')

  const { error: placesError } = useFetch<Types.Place[]>('/places')

  const { places, isLoading: isPlacesLoading } = usePlaces()

  const [selectedPlace, setSelectedPlace] = useState<Types.Place | undefined>()

  const onClickMarker = (event, place: Types.Place) => {
    event.originalEvent.stopPropagation()
    if (place.title === selectedPlace?.title) {
      setSelectedPlace(undefined)
      return
    }
    setSelectedPlace(place)
  }

  useEffect(() => {
    console.log(selectedPlace)
  }, [selectedPlace])

  const onClosePopup = () => setSelectedPlace(undefined)

  if (isTokenLoading || tokenError || isPlacesLoading || placesError) {
    if (tokenError) console.log(tokenError)
    if (placesError) console.log(placesError)
    return <Loading />
  }

  return (
    <>
      <Box sx={placesCountContainerStyles}>
        <FaStoreAlt color={COLORS.primary} size={15} />
        <Box width={8} />
        <Box>{places.length} places found</Box>
      </Box>
      <Box sx={mapContainerStyles}>
        <Map {...MAP} mapboxAccessToken={mapboxAccessToken}>
          <NavBar />
          {places.map(place => {
            if (place.coordinate?.latitude && place.coordinate?.longitude) {
              return (
                <Marker
                  onClick={event => onClickMarker(event, place)}
                  place={place}
                  key={`${place.title}-${place.id}`}
                  longitude={Number(place.coordinate.longitude)}
                  latitude={Number(place.coordinate.latitude)}
                  anchor='bottom'
                  selectedPlace={selectedPlace}
                />
              )
            }
          })}
          {selectedPlace && (
            <Popup
              maxWidth='fit-content'
              anchor='bottom'
              place={selectedPlace}
              onClose={onClosePopup}
              longitude={Number(selectedPlace.coordinate.longitude)}
              latitude={Number(selectedPlace.coordinate.latitude)}
            />
          )}
          {children}
        </Map>
      </Box>
    </>
  )
}

export default MainMap
