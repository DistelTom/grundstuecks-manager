import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatArea } from "@/lib/utils"
import { Search, Filter, Plus, MapPin, User, FileText } from "lucide-react"

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { search?: string; type?: string; municipality?: string }
}) {
  // Fetch properties from API
  const params = new URLSearchParams()
  if (searchParams.search) params.append('search', searchParams.search)
  if (searchParams.type) params.append('type', searchParams.type)
  if (searchParams.municipality) params.append('municipality', searchParams.municipality)

  const res = await fetch(
    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/properties?${params}`,
    { cache: 'no-store' }
  )
  const properties = await res.json()

  const typeColors: Record<string, string> = {
    ACKER: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    WIESE: 'bg-green-100 text-green-800 border-green-300',
    WALD: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    WEIDE: 'bg-lime-100 text-lime-800 border-lime-300',
    OBST: 'bg-orange-100 text-orange-800 border-orange-300',
    WEINBERG: 'bg-purple-100 text-purple-800 border-purple-300',
    GEBAEUDE: 'bg-gray-100 text-gray-800 border-gray-300',
    SONSTIGES: 'bg-blue-100 text-blue-800 border-blue-300',
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
              <p className="text-xs text-muted-foreground">Grundstücke</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-700">Dashboard</a>
            <a href="/grundstuecke" className="text-sm font-medium text-green-700">Grundstücke</a>
            <a href="/kontakte" className="text-sm font-medium text-gray-600 hover:text-green-700">Kontakte</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Grundstücke</h2>
            <p className="text-gray-600 mt-2">
              {properties.length} {properties.length === 1 ? 'Grundstück' : 'Grundstücke'}
            </p>
          </div>
          <Link href="/grundstuecke/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Neues Grundstück
            </Button>
          </Link>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  name="search"
                  placeholder="Flurstück, Gemeinde, Grundbuch..."
                  className="pl-10"
                  defaultValue={searchParams.search}
                />
              </div>
              <select
                name="type"
                className="px-4 py-2 border rounded-md bg-white"
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
              <Button type="submit" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtern
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold mb-2">Keine Grundstücke gefunden</h3>
              <p className="text-gray-600 mb-6">
                {searchParams.search || searchParams.type
                  ? 'Versuchen Sie andere Suchbegriffe'
                  : 'Legen Sie Ihr erstes Grundstück an'}
              </p>
              {!searchParams.search && !searchParams.type && (
                <Link href="/grundstuecke/new">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Erstes Grundstück anlegen
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: any) => (
              <Link key={property.id} href={`/grundstuecke/${property.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${typeColors[property.type]}`}>
                            {property.type}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300">
                            {property.status}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{property.parcelNumber}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          GB: {property.landRegistry}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{property.municipality}</span>
                        {property.district && <span>({property.district})</span>}
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="h-4 w-4">📏</span>
                        <span className="font-semibold text-green-700">
                          {formatArea(property.areaHa)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{property.owner.name}</span>
                      </div>

                      {property.tenant && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="h-4 w-4">🤝</span>
                          <span>Pächter: {property.tenant.name}</span>
                        </div>
                      )}

                      {property._count && property._count.documents > 0 && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FileText className="h-4 w-4" />
                          <span>{property._count.documents} Dokumente</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
