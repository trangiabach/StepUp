import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Box, Typography } from '@mui/material'
import useFetch from 'http-react'
import { CATEGORY_ICON } from '(consts)/map'
import COLORS from '(consts)/colors'
import { TRANSITION } from './NavBar'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import zIndex from '@mui/material/styles/zIndex'
import { usePlaces } from '(context)/places'

const OPTION_SIZE = 35

const SWIPER_BUTTON_SIZE = 25

const processTitleText = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (s: string) => s.toUpperCase())
}

const SwiperNextButton = () => {
  const swiper = useSwiper()

  const nextSwiper = () => {
    swiper.slideNext()
  }

  return (
    <Box
      width={SWIPER_BUTTON_SIZE}
      height={SWIPER_BUTTON_SIZE}
      display='flex'
      justifyContent='center'
      alignContent='center'
      sx={{
        cursor: 'pointer',
        color: COLORS.dark,
        zIndex: 100,
        position: 'absolute',
        right: '0',
        top: 18,
        bottom: 0,
        border: '1px solid grey',
        borderRadius: '50%',
        backgroundColor: COLORS.white,
        transition: TRANSITION,
        '&:hover': {
          backgroundColor: COLORS.dark,
          color: COLORS.white
        }
      }}
      onClick={nextSwiper}
    >
      <KeyboardArrowRightIcon sx={{ width: 18 }} />
    </Box>
  )
}

const SwiperPrevButton = () => {
  const swiper = useSwiper()

  const nextSwiper = () => {
    swiper.slidePrev()
  }

  return (
    <Box
      width={SWIPER_BUTTON_SIZE}
      height={SWIPER_BUTTON_SIZE}
      display='flex'
      justifyContent='center'
      alignContent='center'
      sx={{
        cursor: 'pointer',
        color: COLORS.dark,
        zIndex: 100,
        position: 'absolute',
        left: '0',
        top: 18,
        bottom: 0,
        border: '1px solid grey',
        borderRadius: '50%',
        backgroundColor: COLORS.white,
        transition: TRANSITION,
        '&:hover': {
          backgroundColor: COLORS.dark,
          color: COLORS.white
        }
      }}
      onClick={nextSwiper}
    >
      <KeyboardArrowLeftIcon sx={{ width: 18 }} />
    </Box>
  )
}

const CategoryNav = () => {
  const { data: categories, loading: isCategoriesLoading } =
    useFetch<string[]>('/types')

  const { setSelectedPlaceType, selectedPlaceType, resetToAllPlaces } =
    usePlaces()

  if (!categories || isCategoriesLoading) {
    return null
  }

  const onCategoryClick = (category: string) => {
    console.log(category)
    setSelectedPlaceType(category)
  }

  const isSelectedPlace = selectedPlaceType !== null

  const onReset = () => {
    resetToAllPlaces()
  }

  return (
    <Box sx={{ width: '100%', cursor: 'grab' }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={9}
        style={{
          position: 'relative',
          display: 'flex',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
      >
        <SwiperPrevButton />
        <SwiperNextButton />
        {categories.map(category => {
          const IconComponent = CATEGORY_ICON[category]
          const isSelected = category === selectedPlaceType
          return (
            <SwiperSlide key={category}>
              <Box
                display='flex'
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
                gap='6px'
                sx={{
                  cursor: 'pointer',
                  transition: TRANSITION,
                  backgroundColor: isSelected ? COLORS.secondary : COLORS.white,
                  '&:hover': {
                    backgroundColor: isSelected ? undefined : COLORS.gray
                  }
                }}
                padding='8px'
                borderRadius={2}
                onClick={() => onCategoryClick(category)}
              >
                <Box
                  width={OPTION_SIZE}
                  height={OPTION_SIZE}
                  display='flex'
                  justifyContent='center'
                  bgcolor={isSelected ? COLORS.white : COLORS.secondary}
                  alignItems='center'
                  borderRadius={2}
                >
                  <IconComponent size={15} color={COLORS.primary} />
                </Box>
                <Typography
                  sx={{
                    color: isSelected ? COLORS.white : COLORS.dark,
                    fontSize: 14
                  }}
                >
                  {processTitleText(category)}
                </Typography>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {isSelectedPlace && (
        <Box
          display={'flex'}
          bgcolor={COLORS.dark}
          color={COLORS.white}
          paddingX={'10px'}
          width={'fit-content'}
          paddingY={'6px'}
          fontSize='14px'
          borderRadius={'8px'}
          marginLeft='35px'
          marginTop={'10px'}
          sx={{
            '&:hover': {
              backgroundColor: COLORS.secondary,
              cursor: 'pointer'
            }
          }}
          onClick={onReset}
        >
          Reset to all
        </Box>
      )}
    </Box>
  )
}

export default CategoryNav
