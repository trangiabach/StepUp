import { NextResponse } from 'next/server'
import scrapeGoodOnYou from '(scrapers)/goodonyou'

export const POST = async () => {
  try {
    await scrapeGoodOnYou()
    return NextResponse.json('success', { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('error', {
      status: 500
    })
  }
}
