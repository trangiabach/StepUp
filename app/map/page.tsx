'use client'
import MainMap from '(components)/map/MainMap'
import { PlacesContextProvider } from '(context)/places'

const MapPage = () => {
  return (
    <PlacesContextProvider>
      <MainMap />
    </PlacesContextProvider>
  )
}

export default MapPage
