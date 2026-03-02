import { PropertyType, PropertyStatus } from '@prisma/client'

export type PropertyFormData = {
  parcelNumber: string
  landRegistry: string
  municipality: string
  district?: string
  lot?: string
  location?: string
  areaHa: number
  type: PropertyType
  soilQuality?: string
  irrigation?: boolean
  ownerId: string
  tenantId?: string
  leaseStart?: string
  leaseEnd?: string
  leasePricePerHa?: number
  purchaseDate?: string
  purchasePrice?: number
  status?: PropertyStatus
  notes?: string
  tags?: string[]
}

export interface PropertyWithRelations {
  id: string
  parcelNumber: string
  landRegistry: string
  municipality: string
  district?: string | null
  lot?: string | null
  location?: string | null
  areaHa: number
  areaSqM: number
  polygon?: any
  latitude?: number | null
  longitude?: number | null
  type: PropertyType
  soilQuality?: string | null
  irrigation: boolean
  ownerId: string
  owner: {
    id: string
    name: string
    email?: string | null
    phone?: string | null
  }
  tenantId?: string | null
  tenant?: {
    id: string
    name: string
    email?: string | null
  } | null
  leaseStart?: Date | null
  leaseEnd?: Date | null
  leasePricePerHa?: number | null
  purchaseDate?: Date | null
  purchasePrice?: number | null
  status: PropertyStatus
  notes?: string | null
  tags: string[]
  createdAt: Date
  updatedAt: Date
  _count?: {
    documents: number
    activities: number
  }
}

export interface DashboardStats {
  totalArea: number
  byType: Record<PropertyType, number>
  activeCount: number
  totalProperties: number
  averageSize: number
}
