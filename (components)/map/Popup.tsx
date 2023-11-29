import COLORS from '(consts)/colors'
import { MARKER_COLORS, POPUP_COLORS } from '(consts)/map'
import { Types } from '(types)'
import {
  Box,
  Button,
  Chip,
  IconButton,
  SxProps,
  Typography
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Image from 'next/image'
import {
  Popup as MapboxPopup,
  PopupProps as MapboxPopupProps
} from 'react-map-gl'
import { AiOutlineClose } from 'react-icons/ai'
import { capFirstChar } from '(utils)'
import MetricRow from './MetricRow.tsx'

interface PopupProps extends MapboxPopupProps {
  place: Types.Place
}

const popupContainerStyles: SxProps = {
  width: 280,
  bacground: POPUP_COLORS.background,
  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden'
}

const cardContentStyles: SxProps = {
  marginX: '12px',
  paddingY: '10px'
}

const cardHeadingStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const cardHeadingChipStyles: SxProps = {
  fontSize: 10,
  color: MARKER_COLORS.background
}

const detailContentContainerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  gap: '12px'
}

const detailContentStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row'
}

const detailRowStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const detailDotSize = 6

const detailDotStyles: SxProps = {
  width: detailDotSize,
  height: detailDotSize,
  background: COLORS.primary,
  borderRadius: '50%'
}

const detailValueStyles: SxProps = {
  display: 'flex',
  alignItems: 'center'
}

const closeButtonStyles: SxProps = {
  background: COLORS.primary,
  '&:hover': { background: MARKER_COLORS.background, fill: COLORS.primary },
  position: 'absolute',
  top: '5px',
  right: '5px',
  fill: MARKER_COLORS.background
}

const metricRowsContainerStyles: SxProps = {
  paddingTop: '8px'
}

const Popup: React.FC<PopupProps> = ({ place, children, onClose, ...rest }) => {
  return (
    <MapboxPopup onClose={onClose} {...rest}>
      <Box sx={popupContainerStyles}>
        <Box position='relative' height={180}>
          <IconButton size='small' sx={closeButtonStyles} onClick={onClose}>
            <AiOutlineClose size={10} fill='inherit' />
          </IconButton>
          <Image
            width={1}
            height={1}
            src={place.thumbnailUrl}
            alt={`${place.title} thumbnail image`}
            sizes='50vw'
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        </Box>
        <Box sx={cardContentStyles}>
          <Box sx={cardHeadingStyles}>
            <Typography
              component='h1'
              fontSize={16}
              color='black'
              fontWeight={500}
            >
              {place.title}
            </Typography>
            <Chip
              color='primary'
              label={capFirstChar(place.type)}
              size='small'
              sx={cardHeadingChipStyles}
            />
          </Box>
          <Box height={5} />
          <Box sx={detailContentContainerStyles}>
            <Box sx={detailContentStyles}>
              <Box sx={detailRowStyles}>
                <Box sx={detailDotStyles} />
              </Box>
              <Box width={6} />
              <Box sx={detailValueStyles}>
                <Typography color='black' fontSize={12} fontWeight={400}>
                  {place.location}
                </Typography>
              </Box>
            </Box>
            <Box sx={detailContentStyles}>
              <Box sx={detailRowStyles}>
                <Box sx={detailDotStyles} />
              </Box>
              <Box width={6} />
              <Box sx={detailValueStyles}>
                {Array(parseInt(place.priceRange))
                  .fill(undefined)
                  .map((_, index) => (
                    <span
                      key={index}
                      style={{ color: 'black', fontSize: 12, opacity: 1 }}
                    >
                      $
                    </span>
                  ))}
                {Array(5 - parseInt(place.priceRange))
                  .fill(undefined)
                  .map((_, index) => (
                    <span
                      key={index}
                      style={{ color: 'black', fontSize: 12, opacity: 0.2 }}
                    >
                      $
                    </span>
                  ))}
              </Box>
            </Box>
          </Box>
          <Box sx={metricRowsContainerStyles}>
            {place.metrics.map((metric, index) => (
              <MetricRow key={`${index}-${metric.description}`} {...metric} />
            ))}
          </Box>
          <Box sx={{ height: 10 }} />
          <Box sx={{ width: '100%' }}>
            <Button
              variant='outlined'
              sx={{
                borderRadius: '20px',
                width: '100%',
                textTransform: 'none',
                textAlign: 'left',
                justifyContent: 'space-between'
              }}
              size='small'
              endIcon={<ChevronRightIcon fontSize='medium' />}
            >
              Learn more
            </Button>
          </Box>
        </Box>
      </Box>
      {children}
    </MapboxPopup>
  )
}

export default Popup
