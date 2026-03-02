import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PropertyType, PropertyStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') as PropertyType | null
    const status = searchParams.get('status') as PropertyStatus | null
    const municipality = searchParams.get('municipality')
    const ownerId = searchParams.get('ownerId')
    const search = searchParams.get('search')

    const where: any = {}

    if (type) where.type = type
    if (status) where.status = status
    if (municipality) where.municipality = { contains: municipality, mode: 'insensitive' }
    if (ownerId) where.ownerId = ownerId
    if (search) {
      where.OR = [
        { parcelNumber: { contains: search, mode: 'insensitive' } },
        { landRegistry: { contains: search, mode: 'insensitive' } },
        { municipality: { contains: search, mode: 'insensitive' } },
      ]
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            documents: true,
            activities: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const property = await prisma.property.create({
      data: {
        parcelNumber: body.parcelNumber,
        landRegistry: body.landRegistry,
        municipality: body.municipality,
        district: body.district || null,
        lot: body.lot || null,
        location: body.location || null,
        areaHa: parseFloat(body.areaHa),
        areaSqM: parseFloat(body.areaHa) * 10000,
        type: body.type,
        soilQuality: body.soilQuality || null,
        irrigation: body.irrigation || false,
        ownerId: body.ownerId,
        tenantId: body.tenantId || null,
        leaseStart: body.leaseStart ? new Date(body.leaseStart) : null,
        leaseEnd: body.leaseEnd ? new Date(body.leaseEnd) : null,
        leasePricePerHa: body.leasePricePerHa ? parseFloat(body.leasePricePerHa) : null,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
        purchasePrice: body.purchasePrice ? parseFloat(body.purchasePrice) : null,
        status: body.status || 'AKTIV',
        notes: body.notes || null,
        tags: body.tags || [],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error: any) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property', details: error.message },
      { status: 500 }
    )
  }
}
