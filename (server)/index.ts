import { PrismaClient } from '@prisma/client'
import InfisicalClient from 'infisical-node'
import { Client } from '@googlemaps/google-maps-services-js'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const globalForInfisical = global as unknown as { infisical: InfisicalClient }
const globalForGeocoder = global as unknown as { geocoder: Client }

export const prisma = globalForPrisma.prisma || new PrismaClient()

export const infisical =
  globalForInfisical.infisical ||
  new InfisicalClient({
    token: process.env.INFISICAL_TOKEN
  })

export const geocoder = globalForGeocoder.geocoder || new Client({})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForInfisical.infisical = infisical
  globalForGeocoder.geocoder = geocoder
}
