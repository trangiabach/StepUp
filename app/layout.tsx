import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FetchConfig } from 'http-react'
import Theme from '(components)/common/Theme'
import 'swiper/css'

const MainLayout = ({ children }) => {
  return (
    <html>
      <head>
        <title>StepUP </title>
        <meta name='description' content='StepUP Project Website' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
      </head>
      <FetchConfig baseUrl='/api'>
        <Theme>
          <body>{children}</body>
        </Theme>
      </FetchConfig>
    </html>
  )
}

export default MainLayout
