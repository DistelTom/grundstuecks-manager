import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            mobile: true,
            street: true,
            postalCode: true,
            city: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
        activities: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    })

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const property = await prisma.property.update({
      where: { id: params.id },
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
        status: body.status,
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

    return NextResponse.json(property)
  } catch (error: any) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { error: 'Failed to update property', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.property.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
