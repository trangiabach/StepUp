'use client'

import COLORS from '(consts)/colors'
import { CATEGORY_ICON, MARKER_COLORS } from '(consts)/map'
import { Types } from '(types)'
import { Box, SxProps } from '@mui/material'
import React from 'react'
import { CSSProperties } from 'react'
import { MarkerProps as MapboxMarkerProps } from 'react-map-gl'
import { Marker as MapboxMarker } from 'react-map-gl'

interface MarkerProps extends MapboxMarkerProps {
  place: Types.Place
  selectedPlace: Types.Place | undefined
}

const markerSize = 25

const defaultMarkerContainerStyles: SxProps = {
  height: markerSize,
  width: markerSize,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 0 0 1px #B0B0B0 inset',
  transition: 'all 0.1s ease',
  transformOrigin: '50% 50%',
  transform: 'scale(1)',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.35)'
  }
}

const defaultMarkerIconStyles: CSSProperties = {
  transition: 'all 0.1s ease'
}

const Marker: React.FC<MarkerProps> = ({
  children,
  place,
  selectedPlace,
  ...rest
}) => {
  const CategoryIcon = CATEGORY_ICON[place.type]
  const isSelected = selectedPlace?.title === place.title

  return (
    <MapboxMarker {...rest}>
      <Box
        sx={{
          ...defaultMarkerContainerStyles,
          background: isSelected ? COLORS.primary : MARKER_COLORS.background
        }}
      >
        <CategoryIcon
          style={defaultMarkerIconStyles}
          size={markerSize - 12}
          fill={isSelected ? MARKER_COLORS.background : COLORS.primary}
        />
        {children}
      </Box>
    </MapboxMarker>
  )
}

export default React.memo(Marker)
