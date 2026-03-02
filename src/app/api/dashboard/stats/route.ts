import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      totalAreaResult,
      countByType,
      activeCount,
      totalCount,
    ] = await Promise.all([
      // Gesamtfläche
      prisma.property.aggregate({
        where: { status: 'AKTIV' },
        _sum: { areaHa: true },
      }),
      // Nach Typ
      prisma.property.groupBy({
        by: ['type'],
        where: { status: 'AKTIV' },
        _sum: { areaHa: true },
      }),
      // Aktive Properties
      prisma.property.count({
        where: { status: 'AKTIV' },
      }),
      // Total Properties
      prisma.property.count(),
    ])

    const totalArea = totalAreaResult._sum.areaHa || 0
    const totalCountNum = totalCount || 0
    const averageSize = totalCountNum > 0 ? totalArea / totalCountNum : 0

    // Build byType object
    const byType: Record<string, number> = {
      ACKER: 0,
      WIESE: 0,
      WALD: 0,
      WEIDE: 0,
      OBST: 0,
      WEINBERG: 0,
      GEBAEUDE: 0,
      SONSTIGES: 0,
    }

    countByType.forEach((item) => {
      byType[item.type] = item._sum.areaHa || 0
    })

    const stats = {
      totalArea,
      byType,
      activeCount,
      totalProperties: totalCountNum,
      averageSize,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
