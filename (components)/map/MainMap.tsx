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

interface MainMapProps {
  children?: ReactNode
  places?: Types.Place
}

const mapContainerStyles: SxProps = {
  height: '100vh',
  width: '100vw'
}

const MainMap: React.FC<MainMapProps> = ({ children }) => {
  const {
    data: mapboxAccessToken,
    loading: isTokenLoading,
    error: tokenError
  } = useFetch<string>('/secrets/mapbox')

  const {
    data: places,
    loading: isPlacesLoading,
    error: placesError
  } = useFetch<Types.Place[]>('/places')

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
    return <></>
  }

  return (
    <>
      <NavBar />
      <Box sx={mapContainerStyles}>
        <Map {...MAP} mapboxAccessToken={mapboxAccessToken}>
          {places.map(place => {
            if (place.coordinate?.latitude && place.coordinate?.longitude) {
              return (
                <Marker
                  onClick={event => onClickMarker(event, place)}
                  place={place}
                  key={`${place.title}-${place.id}`}
                  longitude={place.coordinate.longitude}
                  latitude={place.coordinate.latitude}
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
