import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'
    const type = searchParams.get('type')

    const where: any = {}
    if (type) where.type = type

    const properties = await prisma.property.findMany({
      where,
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        tenant: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        parcelNumber: 'asc',
      },
    })

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'Flurstück',
        'Grundbuch',
        'Gemeinde',
        'Gemarkung',
        'Flur',
        'Größe (ha)',
        'Größe (m²)',
        'Art',
        'Bodengüte',
        'Bewässerung',
        'Eigentümer',
        'Eigentümer Email',
        'Eigentümer Telefon',
        'Pächter',
        'Pächter Email',
        'Pachtbeginn',
        'Pachtende',
        'Pacht (€/ha)',
        'Status',
        'Kaufdatum',
        'Kaufpreis (€)',
        'Tags',
        'Notizen',
      ]

      const rows = properties.map((p) => [
        p.parcelNumber,
        p.landRegistry,
        p.municipality,
        p.district || '',
        p.lot || '',
        p.areaHa.toString().replace('.', ','),
        p.areaSqM.toString().replace('.', ','),
        p.type,
        p.soilQuality || '',
        p.irrigation ? 'Ja' : 'Nein',
        p.owner.name,
        p.owner.email || '',
        p.owner.phone || '',
        p.tenant?.name || '',
        p.tenant?.email || '',
        p.leaseStart ? new Date(p.leaseStart).toLocaleDateString('de-DE') : '',
        p.leaseEnd ? new Date(p.leaseEnd).toLocaleDateString('de-DE') : '',
        p.leasePricePerHa ? p.leasePricePerHa.toString().replace('.', ',') : '',
        p.status,
        p.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString('de-DE') : '',
        p.purchasePrice ? p.purchasePrice.toString().replace('.', ',') : '',
        p.tags.join('; '),
        p.notes ? p.notes.replace(/(\r\n|\n|\r)/gm, ' ') : '',
      ])

      const csvContent = [
        headers.join(';'),
        ...rows.map((row) => row.join(';')),
      ].join('\n')

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="grundstuecke-export-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      })
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
