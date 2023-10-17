import { prisma } from '(server)'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const places = await prisma.place.findMany()

    return NextResponse.json(places)
  } catch (error) {
    console.log(error)

    return NextResponse.json('error', {
      status: 500
    })
  }
}
