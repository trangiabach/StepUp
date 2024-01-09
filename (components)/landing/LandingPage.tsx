'use client'

import { Box, Typography } from '@mui/material'
import LandingNav from './LandingNav'
import Spline from '@splinetool/react-spline'
import COLORS from '(consts)/colors'
import { TRANSITION } from '(components)/map/NavBar'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useState } from 'react'
import Loading from '(components)/common/Loading'
import Image from 'next/image'
import { TiLeaf } from 'react-icons/ti'
import { FACTS } from '(consts)/facts'
import { IconType } from 'react-icons/lib'
import { FaPeopleArrows } from 'react-icons/fa6'
import { GiStarFormation } from 'react-icons/gi'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { FaStoreAlt } from 'react-icons/fa'

const getRandomIndex = (array: string[]) => {
  return Math.floor(Math.random() * array.length)
}

const ProcessBlock = ({
  title,
  detail,
  icon
}: {
  title: string
  detail: string
  icon: IconType
}) => {
  const IconComponent = icon

  return (
    <Box
      display={'flex'}
      color={COLORS.dark}
      width={'500px'}
      paddingX={'15px'}
      paddingY={'20px'}
      boxShadow='0 4px 32px rgba(0,0,0,.2)'
      borderRadius={'15px'}
    >
      <Box
        width={35}
        height={35}
        borderRadius={'10px'}
        justifyContent='center'
        alignItems={'center'}
        display='flex'
        bgcolor={COLORS.secondary}
        padding='5px'
      >
        <IconComponent color={COLORS.primary} size={30} />
      </Box>
      <Box width={60} />
      <Box>
        <Box fontWeight={500} fontSize={20}>
          {title}
        </Box>
        <Box height={10} />
        <Box fontSize={15} sx={{ opacity: '60%' }}>
          {detail}
        </Box>
      </Box>
    </Box>
  )
}

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const onSplineLoad = () => {
    setIsLoading(false)
  }

  const [randomFact, setRandomFact] = useState<string>(
    FACTS[getRandomIndex(FACTS)]
  )

  const getRandomFact = () => {
    const randomFact = FACTS[getRandomIndex(FACTS)]
    setRandomFact(randomFact)
  }

  return (
    <>
      {isLoading && <Loading />}
      <Box
        width={'100%'}
        display='flex'
        justifyContent={'center'}
        alignItems='center'
        flexDirection={'column'}
      >
        <LandingNav />
        <Box position={'relative'}>
          <Spline
            style={{ pointerEvents: 'none', transform: 'scale(1.5)' }}
            scene='https://prod.spline.design/7hjn9esD2B4cECvV/scene.splinecode'
            onLoad={onSplineLoad}
          />
          <Box
            sx={{
              position: 'absolute',
              left: '3%',
              top: '30%',
              width: 400
            }}
          >
            <Typography fontSize={40} color={COLORS.dark} fontWeight={'bold'}>
              Making{' '}
              <span style={{ color: COLORS.primary }}>
                eco-friendly lifestyles{' '}
              </span>
              <br />{' '}
              <span
                style={{
                  textDecoration: 'underline',
                  textDecorationColor: COLORS.primary
                }}
              >
                user-friendly
              </span>{' '}
              for all
            </Typography>
            <Box height={8} />
            <Typography>
              StepUP network is an environmental encyclopedia that compiles
              environmental resources, tips, notable news pieces, movement
              updates, and most importantly, locations of sustainable stores
              across the world, all pinned on a filterable interactive map.
            </Typography>
            <Box height={50} />
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
                  display: 'flex',
                  width: 'fit-content'
                }}
              >
                <Typography>Explore the network</Typography>
                <KeyboardArrowRightIcon />
              </Box>
            </a>
          </Box>
        </Box>
        <Box height={100} />
        <Box
          width='95%'
          sx={{
            backgroundColor: COLORS.secondary,
            paddingY: '40px',
            textAlign: 'center',
            borderRadius: '16px'
          }}
          display='flex'
          flexDirection='column'
          alignItems='center'
          id='why-step-up'
        >
          <Typography fontSize={40} color={COLORS.white}>
            Why StepUP?
          </Typography>
          <Box height={20} />
          <Typography
            fontSize={15}
            color={COLORS.white}
            paddingX={25}
            sx={{
              opacity: '0.8'
            }}
          >
            We believe in making eco-friendly lifestyles easier to adopt for
            everyone! To that end, we have collected local data from residents
            in more than 50 countries globally, across all continents. We also
            use distributed algorithms to collect these types of data. We then
            display it through a filterable map public to everyone!
          </Typography>
          <Box height={30} />
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
                  color: COLORS.dark,
                  backgroundColor: COLORS.white
                },
                display: 'flex',
                width: 'fit-content'
              }}
            >
              <Typography>Access the map</Typography>
              <KeyboardArrowRightIcon />
            </Box>
          </a>
          <Box height={40} />
          <Box
            position='relative'
            overflow='hidden'
            borderRadius={2}
            border={`3px solid ${COLORS.primary}`}
            height={550}
            width='80%'
          >
            <Image
              width={1}
              height={1}
              src='/static/why-us.png'
              alt={'Why us image'}
              sizes='100vw'
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </Box>
        </Box>
        <Box height={100} />
        <Box paddingY={10} id='verification-process'>
          <Typography
            display={'flex'}
            color={COLORS.primary}
            textAlign='center'
            alignItems={'center'}
            justifyContent='center'
            gap='12px'
          >
            <FaStoreAlt size={38} color={COLORS.primary} />
            <Typography fontSize={40}>Store vertification process</Typography>
          </Typography>
          <Box height={80} />
          <Box display={'flex'} gap='20px'>
            <ProcessBlock
              title='1st step'
              detail={
                'It needs to be recommended by at least 5 testimonial sources, either by a person or organization that is not institutionally related to the brand. '
              }
              icon={FaPeopleArrows}
            />
            <ProcessBlock
              title='2nd step'
              detail={
                'It needs to have at least 5 out of 18 of the criterias to be considered sustainable to avoid half hearted greenwashing scheme. This could be either reflected by the asserted claims on the website or evidence found on the internet, such as pictures or customer reviews.'
              }
              icon={GiStarFormation}
            />
            <ProcessBlock
              title='3rd step'
              detail={
                'It needs to be credited with at least 1 certifcation indicating sustainability, such as an organic certification, or recommended by a national agency, such as the national television. And even when it passes all three rounds and is considered sustainable, there is a spectrum of greenness to holistically reflect the store’s commitment to sustainability. '
              }
              icon={AiFillSafetyCertificate}
            />
          </Box>
        </Box>
        <Box height={100} />
        <Box
          bgcolor={COLORS.dark}
          color={COLORS.white}
          width='100%'
          borderRadius={'16px'}
          id='fact-gen'
          display={'flex'}
          flexDirection='column'
          alignItems={'center'}
          minHeight='600px'
          paddingY={20}
        >
          <Box height={100} />
          <Box>
            <TiLeaf size={60} color={COLORS.primary} />
          </Box>
          <Box height={10} />
          <Typography width={'100%'} textAlign='center' fontSize={50}>
            Did you know...
          </Typography>
          <Box height={40} />
          <Box
            paddingX='20px'
            paddingY='15px'
            borderRadius={'10px'}
            fontSize={20}
            bgcolor={COLORS.secondary}
            color={COLORS.primary}
            maxWidth={'90%'}
          >
            {randomFact}
          </Box>
          <Box height={30} />
          <Box
            paddingX={'15px'}
            paddingY='5px'
            borderRadius={'8px'}
            bgcolor={COLORS.primary}
            color={COLORS.dark}
            sx={{
              '&:hover': {
                color: COLORS.dark,
                backgroundColor: COLORS.white,
                cursor: 'pointer'
              }
            }}
            fontSize={16}
            onClick={getRandomFact}
          >
            Generate random fact ☘️
          </Box>
          <Box height={100} />
        </Box>
      </Box>
    </>
  )
}

export default LandingPage
