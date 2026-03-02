import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Filter } from "lucide-react"
import Link from "next/link"

export default async function MapPage({
  searchParams,
}: {
  searchParams: { type?: string; municipality?: string }
}) {
  // Fetch properties
  const params = new URLSearchParams()
  if (searchParams.type) params.append('type', searchParams.type)
  if (searchParams.municipality) params.append('municipality', searchParams.municipality)

  const res = await fetch(
    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/properties?${params}`,
    { cache: 'no-store' }
  )
  const properties = await res.json()

  const typeColors: Record<string, string> = {
    ACKER: '#fbbf24',      // yellow
    WIESE: '#22c55e',      // green
    WALD: '#10b981',       // emerald
    WEIDE: '#84cc16',      // lime
    OBST: '#f97316',       // orange
    WEINBERG: '#a855f7',   // purple
    GEBAEUDE: '#6b7280',   // gray
    SONSTIGES: '#3b82f6',  // blue
  }

  // Calculate center point (simple average of all coordinates)
  const centerLat = properties.length > 0
    ? properties.reduce((sum: number, p: any) => sum + (p.latitude || 49.5), 0) / properties.length
    : 49.5
  const centerLng = properties.length > 0
    ? properties.reduce((sum: number, p: any) => sum + (p.longitude || 9.5), 0) / properties.length
    : 9.5

  // Generate GeoJSON
  const geoJSON = {
    type: "FeatureCollection",
    features: properties.map((property: any) => ({
      type: "Feature",
      properties: {
        id: property.id,
        name: property.parcelNumber,
        type: property.type,
        area: property.areaHa,
        color: typeColors[property.type] || '#3b82f6',
      },
      geometry: property.polygon || {
        type: "Point",
        coordinates: [property.longitude || 9.5, property.latitude || 49.5]
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-green-800">GrundstücksManager</h1>
              <p className="text-xs text-muted-foreground">Kartenansicht</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-700">Dashboard</a>
            <a href="/grundstuecke" className="text-sm font-medium text-gray-600 hover:text-green-700">Grundstücke</a>
            <a href="/karte" className="text-sm font-medium text-green-700">Karte</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Kartenansicht</h2>
          <p className="text-gray-600 mt-2">
            {properties.length} {properties.length === 1 ? 'Grundstück' : 'Grundstücke'} auf der Karte
          </p>
        </div>

        {/* Map Container */}
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* Map Placeholder */}
              <div className="w-full h-[600px] bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative">
                {/* OpenStreetMap Embed (using iframe for MVP) */}
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${centerLng - 0.1}%2C${centerLat - 0.1}%2C${centerLng + 0.1}%2C${centerLat + 0.1}&layer=mapnik&marker=${centerLat}%2C${centerLng}`}
                  className="absolute inset-0 w-full h-full border-0"
                  title="Grundstücke Karte"
                />

                {/* Legend Overlay */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
                  <h3 className="font-semibold mb-2 text-sm">Nutzungsart</h3>
                  <div className="space-y-1">
                    {Object.entries(typeColors).map(([type, color]) => (
                      <div key={type} className="flex items-center gap-2 text-xs">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color }}
                        />
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filter Overlay */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Filter className="h-4 w-4" />
                    <h3 className="font-semibold text-sm">Filter</h3>
                  </div>
                  <form className="space-y-2">
                    <select
                      name="type"
                      className="w-full text-xs px-2 py-1 border rounded"
                      defaultValue={searchParams.type || ''}
                    >
                      <option value="">Alle Arten</option>
                      <option value="ACKER">Acker</option>
                      <option value="WIESE">Wiese</option>
                      <option value="WALD">Wald</option>
                      <option value="WEIDE">Weide</option>
                      <option value="OBST">Obst</option>
                      <option value="WEINBERG">Weinberg</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Anwenden
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties List Below Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Grundstücke in dieser Ansicht
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((property: any) => (
                <Link key={property.id} href={`/grundstuecke/${property.id}`}>
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: typeColors[property.type] }}
                      >
                        {property.type}
                      </span>
                      <span className="text-sm font-semibold">{property.areaHa} ha</span>
                    </div>
                    <h4 className="font-semibold text-sm">{property.parcelNumber}</h4>
                    <p className="text-xs text-muted-foreground">
                      📍 {property.municipality}
                    </p>
                    {property.owner && (
                      <p className="text-xs text-muted-foreground">
                        👤 {property.owner.name}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">
                {properties.reduce((sum: number, p: any) => sum + p.areaHa, 0).toFixed(1)} ha
              </div>
              <p className="text-xs text-muted-foreground">Gesamtfläche</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">
                {properties.length}
              </div>
              <p className="text-xs text-muted-foreground">Grundstücke</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">
                {properties.filter((p: any) => p.type === 'ACKER').length}
              </div>
              <p className="text-xs text-muted-foreground">Äcker</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">
                {properties.filter((p: any) => p.type === 'WALD').length}
              </div>
              <p className="text-xs text-muted-foreground">Waldflächen</p>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Navigation className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Kartenansicht - MVP Version</h3>
                <p className="text-sm text-blue-800">
                  Dies ist die erste Version der Kartenansicht mit OpenStreetMap Integration.
                  In zukünftigen Versionen: Polygon-Zeichnung, Geo-Editor, Layer-Management,
                  und interaktive Markern für jedes Grundstück.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
