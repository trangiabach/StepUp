import COLORS from '(consts)/colors'
import { Box, LinearProgress, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        top: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        height: '100vh',
        width: '100vw',
        zIndex: 9999,
        flexDirection: 'column'
      }}
    >
      <Typography fontSize={16} color={COLORS.primary}>
        Loading StepUp Network...
      </Typography>
      <Box height={10} />
      <Box width={400}>
        <LinearProgress />
      </Box>
      <Box />
    </Box>
  )
}

export default Loading
