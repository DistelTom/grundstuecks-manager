import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default owner contact
  const defaultOwner = await prisma.contact.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      type: 'EIGENTUEMER',
      name: 'Tom Müller',
      firstName: 'Tom',
      lastName: 'Müller',
      email: 'tom.mueller@example.de',
      phone: '+49 1512 1516887',
      mobile: '+49 1512 1516887',
      street: 'Hauptstraße 12',
      postalCode: '74747',
      city: 'Ravenstein-Hüngheim',
      country: 'Deutschland',
      notes: 'Hauptbesitzer - Hof in Ravenstein',
    },
  })
  console.log('✅ Default owner created:', defaultOwner.name)

  // Create tenant contact
  const tenant = await prisma.contact.upsert({
    where: { email: 'max.schmidt@example.de' },
    update: {},
    create: {
      type: 'PAECHTER',
      name: 'Max Schmidt',
      firstName: 'Max',
      lastName: 'Schmidt',
      email: 'max.schmidt@example.de',
      phone: '+49 170 1234567',
      street: 'Dorfstraße 5',
      postalCode: '74746',
      city: 'Ravenstein',
      iban: 'DE89 3704 0044 0532 0130 00',
      bank: 'Sparkasse',
      notes: 'Pächter für Wiesenflächen',
    },
  })
  console.log('✅ Tenant created:', tenant.name)

  // Create properties
  const properties = [
    {
      parcelNumber: 'Flur 5, Flst. 123/4',
      landRegistry: 'GB 456',
      municipality: 'Ravenstein',
      district: 'Ravenstein',
      lot: '5',
      location: 'An der B 277, gegenüber Sägewerk',
      areaHa: 12.5,
      areaSqM: 125000,
      type: 'ACKER',
      soilQuality: 'A2',
      irrigation: true,
      ownerId: defaultOwner.id,
      status: 'AKTIV',
      notes: 'Guter Ackerboden, früher Weizen angebaut. Jetzt für Mais genutzt.',
      tags: ['Bio', 'Vorzugsweise', 'Mais'],
    },
    {
      parcelNumber: 'Flur 7, Flst. 456/1',
      landRegistry: 'GB 456',
      municipality: 'Ravenstein',
      district: 'Ravenstein',
      lot: '7',
      location: 'Am Waldrand',
      areaHa: 8.2,
      areaSqM: 82000,
      type: 'WIESE',
      soilQuality: 'B3',
      irrigation: false,
      ownerId: defaultOwner.id,
      tenantId: tenant.id,
      leaseStart: new Date('2023-01-01'),
      leaseEnd: new Date('2033-12-31'),
      leasePricePerHa: 300,
      status: 'VERPAchtetET',
      notes: 'Grünland für Heu-Produktion. Wird von Max Schmidt gepachtet.',
      tags: ['Grünland', 'Heu'],
    },
    {
      parcelNumber: 'Flur 12, Flst. 789/2',
      landRegistry: 'GB 789',
      municipality: 'Ravenstein',
      district: 'Ravenstein',
      lot: '12',
      location: 'Im Tal',
      areaHa: 15.8,
      areaSqM: 158000,
      type: 'WALD',
      soilQuality: null,
      irrigation: false,
      ownerId: defaultOwner.id,
      status: 'AKTIV',
      notes: 'Mischwald mit mainly Nadelbäumen. Forstwirtschaftliche Nutzung.',
      tags: ['Forst', 'Nadelholz'],
    },
    {
      parcelNumber: 'Flur 3, Flst. 234/5',
      landRegistry: 'GB 123',
      municipality: 'Ravenstein',
      district: 'Ravenstein',
      lot: '3',
      location: 'Am Bach',
      areaHa: 5.5,
      areaSqM: 55000,
      type: 'WEIDE',
      soilQuality: 'B2',
      irrigation: false,
      ownerId: defaultOwner.id,
      status: 'AKTIV',
      notes: 'Weidefläche für Rinder. Zugang zum Bach vorhanden.',
      tags: ['Rinder', 'Weide'],
    },
    {
      parcelNumber: 'Flur 8, Flst. 345/6',
      landRegistry: 'GB 456',
      municipality: 'Ravenstein',
      district: 'Ravenstein',
      lot: '8',
      location: 'Am Sonnenhang',
      areaHa: 2.1,
      areaSqM: 21000,
      type: 'OBST',
      soilQuality: 'A3',
      irrigation: true,
      ownerId: defaultOwner.id,
      status: 'AKTIV',
      notes: 'Obstplantage mit Äpfeln und Birnen. Tropfbewässerung vorhanden.',
      tags: ['Obst', 'Äpfel', 'Birnen'],
    },
    {
      parcelNumber: 'Flur 15, Flst. 678/9',
      landRegistry: 'GB 890',
      municipality: 'Ravenstein',
      district: 'Ravenstein',
      lot: '15',
      location: 'Neue Flur',
      areaHa: 20.0,
      areaSqM: 200000,
      type: 'ACKER',
      soilQuality: 'A1',
      irrigation: true,
      ownerId: defaultOwner.id,
      tenantId: tenant.id,
      leaseStart: new Date('2024-01-01'),
      leaseEnd: new Date('2029-12-31'),
      leasePricePerHa: 450,
      purchaseDate: new Date('2020-06-15'),
      purchasePrice: 150000,
      status: 'VERPAchtetET',
      notes: 'Neu erworbene Fläche mit bester Bodengüte. Zuckerrüben-Anbau.',
      tags: ['Zuckerrüben', 'Neuerwerb'],
    },
  ]

  for (const propertyData of properties) {
    await prisma.property.upsert({
      where: { parcelNumber: propertyData.parcelNumber as string },
      update: {},
      create: propertyData as any,
    })
    console.log(`✅ Property created: ${propertyData.parcelNumber}`)
  }

  // Create some documents
  const property = await prisma.property.findFirst({
    where: { parcelNumber: 'Flur 5, Flst. 123/4' },
  })

  if (property) {
    await prisma.document.create({
      data: {
        propertyId: property.id,
        type: 'GRUNDBUCH',
        title: 'Grundbuchauszug Flurstück 123/4',
        description: 'Aktueller Grundbuchauszug vom 15.03.2024',
        fileUrl: '/documents/grundbuch-123-4.pdf',
        fileName: 'grundbuch-123-4.pdf',
        fileSize: 245862,
        mimeType: 'application/pdf',
        documentDate: new Date('2024-03-15'),
      },
    })
    console.log('✅ Document created')

    await prisma.document.create({
      data: {
        propertyId: property.id,
        type: 'KARTE',
        title: 'Flurkarte Ravenstein Flur 5',
        description: 'Offizielle Flurkarte',
        fileUrl: '/documents/flurkarte-5.png',
        fileName: 'flurkarte-5.png',
        fileSize: 856432,
        mimeType: 'image/png',
      },
    })
    console.log('✅ Document created (map)')
  }

  // Create activities
  if (property) {
    await prisma.activity.create({
      data: {
        propertyId: property.id,
        type: 'AUSSAAT',
        title: 'Mais Aussaat 2024',
        description: 'Silomais gesät, Sorte: Ronaldinho',
        date: new Date('2024-04-15'),
        cropType: 'Mais',
        yieldAmount: null,
        costs: 2500,
      },
    })
    console.log('✅ Activity created (sowing)')

    await prisma.activity.create({
      data: {
        propertyId: property.id,
        type: 'ERNTE',
        title: 'Mais Ernte 2023',
        description: 'Gute Ernte, hohe Qualität',
        date: new Date('2023-10-05'),
        cropType: 'Mais',
        yieldAmount: 85.5,
        yieldPerHa: 6.84,
        costs: null,
      },
    })
    console.log('✅ Activity created (harvest)')
  }

  // Create subsidy
  if (property) {
    await prisma.subsidy.create({
      data: {
        propertyId: property.id,
        program: 'Förderung Ökolandbau 2024',
        programNumber: 'ÖKO-2024-12345',
        type: 'Prämie für ökologischen Landbau',
        description: 'Jahresprämie für Bio-Ackerfläche',
        amount: 3500,
        year: 2024,
        appliedAt: new Date('2024-01-15'),
        approvedAt: new Date('2024-02-20'),
        paidOutAt: new Date('2024-03-01'),
        paidOut: 3500,
        status: 'AUSGEZAHLT',
        notes: 'Fristgerecht bewilligt und ausgezahlt',
      },
    })
    console.log('✅ Subsidy created')
  }

  console.log('\\n🎉 Seeding complete!')
  console.log('\\n📊 Summary:')
  const propertyCount = await prisma.property.count()
  const contactCount = await prisma.contact.count()
  const documentCount = await prisma.document.count()
  const activityCount = await prisma.activity.count()
  const subsidyCount = await prisma.subsidy.count()

  console.log(`   - ${propertyCount} Grundstücke`)
  console.log(`   - ${contactCount} Kontakte`)
  console.log(`   - ${documentCount} Dokumente`)
  console.log(`   - ${activityCount} Aktivitäten`)
  console.log(`   - ${subsidyCount} Subventionen`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
