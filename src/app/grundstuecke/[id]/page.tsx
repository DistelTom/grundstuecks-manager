import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatArea, formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft, Edit, MapPin, User, FileText, Calendar, DollarSign, Tag } from "lucide-react"
import Link from "next/link"

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/properties/${params.id}`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    notFound()
  }

  const property = await res.json()

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
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-green-800">GrundstücksManager</h1>
              <p className="text-xs text-muted-foreground">Grundstück Details</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-700">Dashboard</a>
            <a href="/grundstuecke" className="text-sm font-medium text-green-700">Grundstücke</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/grundstuecke">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Liste
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded text-sm font-medium border ${typeColors[property.type]}`}>
                  {property.type}
                </span>
                <span className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300">
                  {property.status}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{property.parcelNumber}</h2>
              <p className="text-gray-600 mt-1">Grundbuch: {property.landRegistry}</p>
            </div>
            <Link href={`/grundstuecke/${property.id}/edit`}>
              <Button className="bg-green-600 hover:bg-green-700">
                <Edit className="h-4 w-4 mr-2" />
                Bearbeiten
              </Button>
            </Link>
          </div>
        </div>

        {/* Hauptinfo */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <span className="text-xl">📏</span>
                Größe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {formatArea(property.areaHa)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {property.areaSqM.toLocaleString('de-DE')} m²
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">{property.municipality}</div>
              {property.district && (
                <p className="text-sm text-muted-foreground mt-1">Gemarkung: {property.district}</p>
              )}
              {property.lot && (
                <p className="text-sm text-muted-foreground">Flur: {property.lot}</p>
              )}
              {property.location && (
                <p className="text-sm text-gray-600 mt-2 italic">{property.location}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-5 w-5" />
                Eigentümer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">{property.owner.name}</div>
              {property.owner.email && (
                <p className="text-sm text-muted-foreground mt-1">{property.owner.email}</p>
              )}
              {property.owner.phone && (
                <p className="text-sm text-muted-foreground">{property.owner.phone}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Pacht & Kauf */}
          <Card>
            <CardHeader>
              <CardTitle>Pacht & Kauf</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {property.tenant && (
                <>
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Pächter</span>
                    <span className="font-medium">{property.tenant.name}</span>
                  </div>
                  {property.leaseStart && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Pachtbeginn</span>
                      <span className="font-medium">{formatDate(property.leaseStart)}</span>
                    </div>
                  )}
                  {property.leaseEnd && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Pachtende</span>
                      <span className="font-medium">{formatDate(property.leaseEnd)}</span>
                    </div>
                  )}
                  {property.leasePricePerHa && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Pacht pro Hektar</span>
                      <span className="font-medium">{formatCurrency(property.leasePricePerHa)}/Jahr</span>
                    </div>
                  )}
                  {property.leasePricePerHa && property.areaHa && (
                    <div className="flex justify-between items-start pt-2 border-t">
                      <span className="text-sm text-muted-foreground">Gesamtpacht/Jahr</span>
                      <span className="font-bold text-green-700">
                        {formatCurrency(property.leasePricePerHa * property.areaHa)}
                      </span>
                    </div>
                  )}
                </>
              )}

              {property.purchaseDate && (
                <div className="flex justify-between items-start pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Kaufdatum</span>
                  <span className="font-medium">{formatDate(property.purchaseDate)}</span>
                </div>
              )}

              {property.purchasePrice && (
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Kaufpreis</span>
                  <span className="font-bold text-green-700">{formatCurrency(property.purchasePrice)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bodendaten */}
          <Card>
            <CardHeader>
              <CardTitle>Bodendaten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Nutzungsart</span>
                <span className="px-2 py-1 rounded text-sm font-medium border bg-white">
                  {property.type}
                </span>
              </div>

              {property.soilQuality && (
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Bodengüte</span>
                  <span className="font-medium">{property.soilQuality}</span>
                </div>
              )}

              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Bewässerung</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  property.irrigation ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {property.irrigation ? 'Vorhanden' : 'Keine'}
                </span>
              </div>

              {property.tags && property.tags.length > 0 && (
                <div className="pt-2 border-t">
                  <span className="text-sm text-muted-foreground block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {property.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notizen */}
        {property.notes && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notizen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{property.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Dokumente & Aktivitäten */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dokumente ({property.documents?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {property.documents && property.documents.length > 0 ? (
                <div className="space-y-2">
                  {property.documents.map((doc: any) => (
                    <div key={doc.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-sm text-muted-foreground">{doc.type}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Keine Dokumente vorhanden</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Letzte Aktivitäten ({property.activities?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {property.activities && property.activities.length > 0 ? (
                <div className="space-y-2">
                  {property.activities.map((activity: any) => (
                    <div key={activity.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(activity.date)} • {activity.type}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Keine Aktivitäten vorhanden</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
