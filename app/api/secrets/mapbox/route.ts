import { infisical } from '(server)'
import { NextResponse } from 'next/server'

export const getMapBoxToken = async () => {
  const { secretValue } = await infisical.getSecret('MAPBOX_TOKEN', {
    environment: 'prod',
    path: '/',
    type: 'shared'
  })
  return secretValue
}

export const GET = async () => {
  try {
    const token = await getMapBoxToken()
    return NextResponse.json(token)
  } catch (error) {
    console.log(error)
    return NextResponse.json('error', {
      status: 500
    })
  }
}
