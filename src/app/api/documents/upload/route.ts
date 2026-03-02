import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const propertyId = formData.get('propertyId') as string
    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const file = formData.get('file') as File
    const documentDate = formData.get('documentDate') as string | null

    if (!propertyId || !type || !title || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For MVP: Store file info (in production, upload to Vercel Blob/S3)
    const fileUrl = `/documents/${propertyId}/${Date.now()}-${file.name}`
    const buffer = Buffer.from(await file.arrayBuffer())

    // TODO: In production, upload to Vercel Blob Storage:
    // const blob = await put(file.name, file, { access: 'public' })

    const document = await prisma.document.create({
      data: {
        propertyId,
        type,
        title,
        description: description || null,
        fileUrl,
        fileName: file.name,
        fileSize: buffer.length,
        mimeType: file.type,
        documentDate: documentDate ? new Date(documentDate) : null,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error: any) {
    console.error('Error uploading document:', error)
    return NextResponse.json(
      { error: 'Failed to upload document', details: error.message },
      { status: 500 }
    )
  }
}
