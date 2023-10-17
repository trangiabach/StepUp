'use client'

import COLORS from '(consts)/colors'
import FONTS from '(consts)/fonts'
import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

interface ThemeProps {
  children: ReactNode
}

const theme = createTheme({
  typography: {
    fontFamily: FONTS.primary
  },
  palette: {
    primary: {
      main: COLORS.primary
    }
  }
})

const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
