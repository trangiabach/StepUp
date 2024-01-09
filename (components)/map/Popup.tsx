import COLORS from '(consts)/colors'
import { MARKER_COLORS, POPUP_COLORS } from '(consts)/map'
import { Types } from '(types)'
import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
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
import MetricRow, { normalize } from './MetricRow.tsx'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { TRANSITION } from './NavBar'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

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

const modalStyle: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: '0 4px 32px rgba(0,0,0,.2)',
  padding: '15px 20px',
  borderRadius: '10px',
  maxHeight: 800,
  overflow: 'scroll'
}

const Popup: React.FC<PopupProps> = ({ place, children, onClose, ...rest }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  console.log(place)

  return (
    <>
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
            <Box>
              <Typography fontSize={10}>{place.shortDescription}</Typography>
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
                  justifyContent: 'space-between',
                  '&:hover': {
                    backgroundColor: COLORS.dark,
                    color: COLORS.white,
                    borderColor: COLORS.dark
                  },
                  fontSize: 12
                }}
                size='small'
                endIcon={<ChevronRightIcon fontSize='medium' />}
                onClick={handleOpen}
              >
                Learn more
              </Button>
            </Box>
          </Box>
        </Box>
        {children}
      </MapboxPopup>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography fontSize={25} color={COLORS.primary} fontWeight='bold'>
            {place.title}
          </Typography>
          <Box height={10} />
          <Typography fontSize={16}>{place.shortDescription}</Typography>
          <Box height={10} />
          <Box
            position='relative'
            overflow='hidden'
            borderRadius={2}
            height={400}
          >
            <Image
              width={1}
              height={1}
              src={place.thumbnailUrl}
              alt={`${place.title} thumbnail image`}
              sizes='50vw'
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </Box>
          <Box height={20} />
          <Box
            sx={{
              backgroundColor: COLORS.secondary,
              color: COLORS.primary,
              padding: '10px 15px',
              borderRadius: '10px',
              transition: TRANSITION,
              '&:hover': {
                color: COLORS.white,
                backgroundColor: COLORS.dark
              },
              cursor: 'pointer'
            }}
          >
            <Typography fontSize={22} color={COLORS.white}>
              Story
            </Typography>
            <Typography fontSize={14}>{place.description}</Typography>
          </Box>
          <Box height={20} />
          <Box
            sx={{
              backgroundColor: COLORS.dark,
              color: COLORS.white,
              padding: '10px 15px',
              borderRadius: '10px'
            }}
          >
            <Box display='flex' alignItems='center'>
              <Typography fontSize={18}>Price</Typography>
              <Box width={10} />
              <Box display={'flex'} alignItems='center'>
                {Array(parseInt(place.priceRange))
                  .fill(undefined)
                  .map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color: COLORS.primary,
                        fontSize: 18,
                        opacity: 1
                      }}
                    >
                      $
                    </span>
                  ))}
                {Array(5 - parseInt(place.priceRange))
                  .fill(undefined)
                  .map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color: COLORS.primary,
                        fontSize: 18,
                        opacity: 0.2
                      }}
                    >
                      $
                    </span>
                  ))}
              </Box>
            </Box>
            <Box height={15} />
            <Box display='flex' alignItems='center'>
              <Typography fontSize={18}>Overrall Rating</Typography>
              <Box width={10} />
              <Typography fontSize={18} color={COLORS.primary}>
                {place.rating}
              </Typography>
            </Box>
            <Box height={15} />
            <Box display='flex' alignItems='center'>
              <Typography fontSize={18}>Scale</Typography>
              <Box width={10} />
              <Typography fontSize={18} color={COLORS.primary}>
                {place.scale}
              </Typography>
            </Box>
            <Box height={15} />
            <Box>
              {place.metrics.map((metric, index) => (
                <>
                  <Box display={'flex'} alignItems='center'>
                    <Typography fontSize={18}>{metric.description}</Typography>
                    <Box width={10} />
                    {metric.rating === 'Not applicable' ? (
                      <Typography sx={{ color: COLORS.primary, fontSize: 18 }}>
                        Not Applicable
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          sx={{ color: COLORS.primary, fontSize: 15 }}
                        >
                          {metric.rating}
                        </Typography>
                        <Box sx={{ width: 8 }} />
                        <Box sx={{ width: '100%' }}>
                          <LinearProgress
                            variant='determinate'
                            value={normalize(metric.rating)}
                            sx={{ height: 2.5 }}
                          />
                        </Box>
                      </>
                    )}
                  </Box>
                </>
              ))}
            </Box>
            <Box height={15} />
            <Box>
              <Typography fontSize={18}>Tags</Typography>
              <Box height={10} />
              <Box display={'flex'} gap={1} flexWrap='wrap'>
                {place.tags.map(tag => (
                  <Chip label={tag} key={tag} color='primary' />
                ))}
              </Box>
            </Box>
          </Box>
          <Box height={20} />
          <a target='_blank' href={place.accessLink}>
            <Box
              sx={{
                backgroundColor: COLORS.dark,
                color: COLORS.white,
                width: 'fit-content',
                padding: '10px 20px',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: TRANSITION,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: COLORS.primary,
                  color: COLORS.dark
                }
              }}
            >
              <Typography>Visit {place.title}</Typography>
              <Box width={5} />
              <ArrowOutwardIcon />
            </Box>
          </a>
        </Box>
      </Modal>
    </>
  )
}

export default Popup
