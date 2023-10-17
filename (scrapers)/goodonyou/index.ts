import categoriesJson from './categories.json' assert { type: 'json' }
import axios from 'axios'
import * as cheerio from 'cheerio'
import { routes } from './routes'
import { geocoder, prisma } from '(server)'
import { countryList } from '(utils)'

const scrapeBrand = async (link: string, category: string) => {
  try {
    const { data } = await axios.get(link)
    const $ = cheerio.load(data)
    const title = $('#brand-hero-summary h1').text()
    const { data: brandJson } = await axios.get(
      routes.brandJson(
        link.replace('https://directory.goodonyou.eco/brand/', '')
      )
    )
    const imageUrl = brandJson.pageProps?.brand?.imageUrl

    const isPlaceExist = await prisma.place.findFirst({
      where: {
        title
      }
    })

    if (isPlaceExist) {
      return
    }

    const shortDescription = $('[class*="id__BrandIntroduction"]').text()
    const description = $('#rating-summary-text').text()
    const tags: string[] = []
    $('[class*="BrandSummary__CategoryList"] a').each((_, value) => {
      tags.push($(value).text())
    })
    const summaryEl = $('#brand-rating')
    const rating = summaryEl.text().replace('Rated: ', '')
    let price = 0
    summaryEl
      .next()
      .children()
      .each((_, span) => {
        if ($(span).css('opacity') === '1') {
          price += 1
        }
      })
    const metrics: object[] = []
    const location = summaryEl.next().next().text().replace('location: ', '')
    $('[class*="id__RatingSingle"]').each((_, value) => {
      metrics.push({
        description: $(value).children().first().children().first().text(),
        rating: $(value)
          .children()
          .first()
          .children()
          .first()
          .next()
          .text()
          .split(' out of ')[0]
      })
    })
    const accessLink =
      $('[class*="BrandSummary__ButtonBuy"]').find('a').first().attr('href') ||
      'Unavailable'

    const { data: geocodeData } = await geocoder.geocode({
      params: {
        key: process.env.GOOGLE_API_KEY,
        address: title,
        ...(countryList[location] && {
          region: countryList[location].toLowerCase()
        })
      }
    })

    const coordinate: Record<string, number | undefined> = {
      latitude: undefined,
      longitude: undefined
    }

    if (geocodeData.results.length > 0) {
      const geometry = geocodeData.results[0].geometry.location
      coordinate.latitude = geometry.lat
      coordinate.longitude = geometry.lng
    } else {
      const { data: countryGeocodeData } = await geocoder.geocode({
        params: {
          key: process.env.GOOGLE_API_KEY,
          address: location
        }
      })
      const countryGeometry = countryGeocodeData.results[0].geometry.location
      coordinate.latitude =
        countryGeometry.lat + (Math.random() * (100 - 1) + 1) / 10000
      coordinate.longitude =
        countryGeometry.lng + (Math.random() * (100 - 1) + 1) / 10000
    }

    await prisma.place.create({
      data: {
        title,
        description,
        shortDescription,
        type: category,
        tags,
        rating,
        priceRange: price.toString(),
        location,
        metrics,
        accessLink,
        coordinate,
        thumbnailUrl: imageUrl
      }
    })

    console.log(await prisma.place.count())
  } catch (error) {
    console.log(error)
  }
}

const scrapeGoodOnYou = async () => {
  try {
    const categories = categoriesJson.result.categories.map(
      category => category.slug
    )
    await Promise.all(
      categories.map(async category => {
        const { data } = await axios.get(routes.category(category))
        const $ = cheerio.load(data)
        for (const value of $('a')) {
          var link = $(value).attr('href')
          if (link && link.includes('/brand/')) {
            await scrapeBrand(`${routes.home()}${link}`, category)
          }
        }
      })
    )
  } catch (err) {
    console.log(err)
  }
}

export default scrapeGoodOnYou
