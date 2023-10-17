import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FetchConfig } from 'http-react'
import Theme from '(components)/common/Theme'

const MainLayout = ({ children }) => {
  return (
    <html>
      <head>
        <title>StepUP </title>
        <meta name='description' content='StepUP Project Website' />
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
