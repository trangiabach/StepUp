import { prisma } from '(server)'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const data = await prisma.place.findMany({
      distinct: ['type'],
      select: {
        type: true
      }
    })

    const categories = data.map(({ type }) => type)

    return NextResponse.json(categories)
  } catch (err) {
    console.log(err)
    return NextResponse.json('error', { status: 500 })
  }
}
