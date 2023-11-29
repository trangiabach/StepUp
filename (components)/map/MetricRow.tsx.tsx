import COLORS from '(consts)/colors'
import {
  Box,
  IconButton,
  LinearProgress,
  SxProps,
  Tooltip,
  Typography
} from '@mui/material'
import { IconType } from 'react-icons/lib'
import { BsPeopleFill } from 'react-icons/bs'
import { GiPlanetCore, GiPlantsAndAnimals } from 'react-icons/gi'

interface MetricRowProps {
  rating: number | string
  description: string
}

const metricRowContainerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const ratingStyle: SxProps = {
  fontSize: '11px',
  color: COLORS.primary
}

const MIN_PROGRESS = 0
const MAX_PROGRESS = 5
const normalize = (value: number) =>
  ((value - MIN_PROGRESS) * 100) / (MAX_PROGRESS - MIN_PROGRESS)

const labelIconMap: Record<string, IconType> = {
  Planet: GiPlanetCore,
  People: BsPeopleFill,
  Animals: GiPlantsAndAnimals
}

const labelDescriptionMap: Record<string, string> = {
  Planet: 'Impact on the Planet',
  People: 'Impact on people around us',
  Animals: 'Impact on Plants and Animals'
}

const MetricRow: React.FC<MetricRowProps> = ({ description, rating }) => {
  const IconComponent = labelIconMap[description]
  return (
    <Box sx={metricRowContainerStyle}>
      <Tooltip
        title={labelDescriptionMap[description]}
        sx={{ backgroundColor: 'white' }}
        placement='left'
      >
        <IconButton size='small'>
          <IconComponent size={12} color={COLORS.primary} />
        </IconButton>
      </Tooltip>
      <Box sx={{ width: 8 }} />
      {rating === 'Not applicable' ? (
        <Typography sx={{ color: COLORS.primary, fontSize: 11 }}>
          Not Applicable
        </Typography>
      ) : (
        <>
          <Typography sx={ratingStyle}>{rating}/5</Typography>
          <Box sx={{ width: 8 }} />
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant='determinate'
              value={normalize(rating)}
              sx={{ height: 2.5 }}
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default MetricRow
