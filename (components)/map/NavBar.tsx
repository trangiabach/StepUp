'use client'

import COLORS from '(consts)/colors'
import { Box, Button, TextField, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { TiLeaf } from 'react-icons/ti'
import { display } from '@mui/system'
import CategoryNav from './CategoryNav'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { usePlaces } from '(context)/places'

const BORDER_CONTAINER_WIDTH = 300

const BUTTON_PADDING = '10px 14px'

export const TRANSITION = 'all .25s ease'

const NavBar = () => {
  const { places } = usePlaces()

  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: places && places.length > 0 ? Object.keys(places[0]) : []
  }

  const fuse = new Fuse(places, fuseOptions)

  const onSearchChange = event => {
    console.log(event.target.value)

    console.log(fuse.search(event.target.value))
  }

  return (
    <Box
      sx={{
        width: '90%',
        marginX: 'auto',
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '10px',
        backgroundColor: 'white',
        paddingX: '20px',
        paddingY: '15px',
        borderRadius: '15px',
        boxShadow: '0 4px 32px rgba(0,0,0,.2)',
        zIndex: 10
      }}
    >
      <Box
        position={'relative'}
        width='100%'
        display={'flex'}
        justifyContent='space-between'
      >
        <a href='/'>
          <Box
            sx={{
              display: 'flex',
              width: BORDER_CONTAINER_WIDTH,
              alignItems: 'center'
            }}
          >
            <TiLeaf size={23} color={COLORS.primary} />
            <Box width={6} />
            <Typography sx={{ color: COLORS.primary, fontSize: 18.5 }}>
              StepUP
            </Typography>
          </Box>
        </a>
        <Box
          width={'40%'}
          border={`2px solid ${COLORS.secondary}`}
          height='42px'
          borderRadius={4}
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
              background: 'transparent',
              color: COLORS.dark
            }}
            onChange={onSearchChange}
            className='navbar-search-input'
            placeholder='Find substainable stores...'
          />
        </Box>
        <Box
          sx={{
            width: BORDER_CONTAINER_WIDTH + 100,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            fontSize: 15
          }}
        >
          <a
            href={
              'https://docs.google.com/forms/d/e/1FAIpQLSffFpamQMnN5WEvaBkmaYualxBbV0P-cKpDH4XoW5VtQzAgtQ/viewform?fbzx=4359324640355548735'
            }
            target='_blank'
          >
            <Box
              sx={{
                color: COLORS.white,
                cursor: 'pointer',
                backgroundColor: COLORS.dark,
                padding: BUTTON_PADDING,
                borderRadius: '13px',
                transition: TRANSITION,
                '&:hover': {
                  backgroundColor: COLORS.primary,
                  color: COLORS.dark
                }
              }}
            >
              StepUP your business!
            </Box>
          </a>
          <Box sx={{ width: 16 }} />
          <Link href='/#verification-process'>
            <Box
              sx={{
                color: COLORS.dark,
                backgroundColor: COLORS.primary,
                transition: TRANSITION,
                padding: BUTTON_PADDING,
                borderRadius: '10px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: COLORS.dark,
                  color: COLORS.white
                },
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Process
              <KeyboardArrowRightIcon sx={{ width: 20 }} />
            </Box>
          </Link>
        </Box>
      </Box>
      <Box height={30} />
      <Box
        width='100%'
        display={'flex'}
        justifyContent='space-between'
        alignItems='center'
      >
        <Box sx={{ display: 'flex', width: '80%' }}>
          <CategoryNav />
        </Box>
        <Box display='flex'>
          <Link href='/#fact-gen'>
            <Box
              display={'flex'}
              justifyContent='center'
              alignItems='center'
              sx={{
                backgroundColor: COLORS.dark,
                color: COLORS.white,
                height: 'fit-content',
                padding: '10px 12px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: TRANSITION,
                '&:hover': {
                  backgroundColor: COLORS.primary,
                  color: COLORS.dark
                }
              }}
            >
              {/* <FilterAltIcon />
            <Box width={5} /> */}
              <Typography fontSize={15}>Get your fact of the day ☘️</Typography>
            </Box>
          </Link>
          {/* <Box width={25} /> */}
          {/* <Box
            display={'flex'}
            justifyContent='center'
            alignItems='center'
            sx={{
              backgroundColor: COLORS.primary,
              color: COLORS.dark,
              height: 'fit-content',
              padding: '10px 12px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: TRANSITION,
              '&:hover': {
                backgroundColor: COLORS.dark,
                color: COLORS.white
              }
            }}
          >
            <Typography fontSize={15}>Support us</Typography>
            <Box width={5} />
            <AutoAwesomeIcon />
          </Box> */}
        </Box>
      </Box>
    </Box>
  )
}

export default NavBar
