'use client'

import COLORS from '(consts)/colors'
import { Box, Button, TextField, Typography } from '@mui/material'
import { TiLeaf } from 'react-icons/ti'

const BORDER_CONTAINER_WIDTH = 300

const NavBar = () => {
  return (
    <Box
      sx={{
        width: '75%',
        marginX: 'auto',
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '10px',
        backgroundColor: 'white',
        paddingX: '20px',
        paddingY: '25px',
        borderRadius: '15px',
        boxShadow: '0 0 0 1px #B0B0B0 inset',
        zIndex: 10
      }}
    >
      <Box
        position={'relative'}
        width='100%'
        display={'flex'}
        justifyContent='space-between'
      >
        <Box
          sx={{
            display: 'flex',
            width: BORDER_CONTAINER_WIDTH,
            alignItems: 'center'
          }}
        >
          <TiLeaf size={22} color={COLORS.primary} />
          <Box width={6} />
          <Typography sx={{ color: COLORS.primary, fontSize: 18 }}>
            StepUP
          </Typography>
        </Box>
        <Box
          width={'40%'}
          border={`1px solid ${COLORS.primary}`}
          height='38px'
          boxShadow='0 1px 2px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05)'
          borderRadius={16}
          display='flex'
        >
          <input
            type='text'
            style={{
              width: '100%',
              marginLeft: '15px',
              marginRight: '15px',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              background: 'transparent'
            }}
            placeholder='Find substainable stores...'
          />
        </Box>
        <Box
          sx={{
            width: BORDER_CONTAINER_WIDTH,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            fontSize: 15
          }}
        >
          <Box
            sx={{
              color: COLORS.primary,
              cursor: 'pointer'
            }}
          >
            StepUP your business
          </Box>
          <Box sx={{ width: 16 }} />
          <Box
            sx={{
              color: COLORS.primary,
              border: `1px solid ${COLORS.primary}`,
              paddingX: '15px',
              paddingY: '5px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Log In
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', width: '75%' }}>
          
        </Box>
      </Box>
    </Box>
  )
}

export default NavBar
