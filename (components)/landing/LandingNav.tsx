import { TRANSITION } from '(components)/map/NavBar'
import COLORS from '(consts)/colors'
import { Box, Typography } from '@mui/material'
import { TiLeaf } from 'react-icons/ti'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const tabs = [
  {
    title: 'Why StepUP',
    href: '#why-step-up'
  },
  {
    title: 'Substainable Stores Encyclopedia',
    href: '/map'
  },
  {
    title: 'Facts Generator',
    href: '#fact-gen'
  },
  {
    title: 'Store Vertification Process',
    href: '#verification-process'
  }
]
const LandingNav = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        color: COLORS.dark,
        paddingX: '20px',
        paddingY: '15px',
        borderRadius: '15px',
        boxShadow: '0 4px 32px rgba(0,0,0,.2)',
        marginX: 'auto',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '3%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        backgroundColor: 'white'
      }}
    >
      <Box display={'flex'} alignItems='center' gap={1}>
        <TiLeaf size={25} color={COLORS.primary} />
        <Typography fontSize={20} color={COLORS.primary} fontWeight='bold'>
          StepUp
        </Typography>
      </Box>
      <Box display={'flex'} gap={6}>
        {tabs.map(tab => {
          return (
            <Box key={tab.title}>
              <a href={tab.href}>
                <Typography
                  sx={{
                    color: COLORS.dark,
                    transition: TRANSITION,
                    '&:hover': {
                      color: COLORS.primary
                    }
                  }}
                  fontSize={14}
                >
                  {tab.title}
                </Typography>
              </a>
            </Box>
          )
        })}
      </Box>
      <Box display={'flex'} gap={2}>
        <a
          href='https://docs.google.com/forms/d/e/1FAIpQLSffFpamQMnN5WEvaBkmaYualxBbV0P-cKpDH4XoW5VtQzAgtQ/viewform?fbzx=4359324640355548735'
          target={'_blank'}
        >
          <Box
            sx={{
              color: COLORS.dark,
              backgroundColor: COLORS.primary,
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: TRANSITION,
              '&:hover': {
                color: COLORS.white,
                backgroundColor: COLORS.dark
              }
            }}
          >
            Join us!
          </Box>
        </a>
        <a href='/map' target={'_blank'}>
          <Box
            sx={{
              color: COLORS.white,
              backgroundColor: COLORS.dark,
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: TRANSITION,
              '&:hover': {
                color: COLORS.primary,
                backgroundColor: COLORS.secondary
              },
              display: 'flex'
            }}
          >
            <Typography>Visit encyclopedia</Typography>
            <KeyboardArrowRightIcon />
          </Box>
        </a>
      </Box>
    </Box>
  )
}

export default LandingNav
