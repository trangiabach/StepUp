import { IconType } from 'react-icons'
import { MapProps } from 'react-map-gl'
import COLORS from './colors'
import {
  FaHatCowboy,
  FaBaby,
  FaBriefcase,
  FaBed,
  FaTshirt,
  FaPlus,
  FaRunning,
  FaShoePrints,
  FaShoppingBag,
  FaUmbrella,
  FaSwimmer
} from 'react-icons/fa'
import { PiPantsLight } from 'react-icons/pi'

const MAP: MapProps = {
  initialViewState: {
    latitude: 54,
    longitude: 15,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  },
  dragRotate: false,
  mapStyle: 'mapbox://styles/mapbox/streets-v9'
}

export const MARKER_COLORS: Record<string, string> = {
  background: 'white',
  circle: COLORS.primary
}

export const POPUP_COLORS: Record<string, string> = {
  background: 'white'
}

export const CATEGORY_ICON: Record<string, IconType> = {
  accessories: FaHatCowboy, // Placeholder; you might want a more suitable icon.
  maternity: FaBaby,
  suits: FaBriefcase,
  sleepwear: FaBed,
  denim: PiPantsLight,
  bottoms: FaTshirt, // Using a t-shirt as placeholder; you might want a more specific icon.
  tops: FaTshirt,
  'plus-size': FaPlus,
  activewear: FaRunning,
  shoes: FaShoePrints,
  bags: FaShoppingBag,
  outerwear: FaUmbrella, // Using an umbrella as a metaphor for protection against weather.
  swimwear: FaSwimmer
}

export default MAP
