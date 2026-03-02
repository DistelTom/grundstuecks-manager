import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wheat, Trees, Sprout, Building2, Grape, Apple } from "lucide-react"

const propertyIcons: Record<string, any> = {
  ACKER: Wheat,
  WIESE: Sprout,
  WALD: Trees,
  WEIDE: Sprout,
  OBST: Apple,
  WEINBERG: Grape,
  GEBAEUDE: Building2,
  SONSTIGES: Building2,
}

export default async function DashboardPage() {
  // Fetch stats from API
  const statsRes = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/dashboard/stats`, {
    cache: 'no-store',
  })

  const stats = await statsRes.json()

  const typeColors: Record<string, string> = {
    ACKER: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    WIESE: 'bg-green-100 text-green-800 border-green-200',
    WALD: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    WEIDE: 'bg-lime-100 text-lime-800 border-lime-200',
    OBST: 'bg-orange-100 text-orange-800 border-orange-200',
    WEINBERG: 'bg-purple-100 text-purple-800 border-purple-200',
    GEBAEUDE: 'bg-gray-100 text-gray-800 border-gray-200',
    SONSTIGES: 'bg-blue-100 text-blue-800 border-blue-200',
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
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-sm font-medium text-green-700">Dashboard</a>
            <a href="/grundstuecke" className="text-sm font-medium text-gray-600 hover:text-green-700">Grundstücke</a>
            <a href="/kontakte" className="text-sm font-medium text-gray-600 hover:text-green-700">Kontakte</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Willkommen zurück! 👋</h2>
          <p className="text-gray-600 mt-2">Hier ist Ihre aktuelle Übersicht</p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Gesamtfläche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {stats.totalArea.toFixed(1)} <span className="text-lg">ha</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.totalProperties} Grundstücke
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Aktiv
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {stats.activeCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                In Nutzung
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Durchschnittsgröße
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {stats.averageSize.toFixed(1)} <span className="text-lg">ha</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Pro Grundstück
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Gesamtfläche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {(stats.totalArea * 10000).toLocaleString('de-DE')} <span className="text-lg">m²</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                In Quadratmetern
              </p>
            </CardContent>
          </Card>
        </div>

        {/* By Type */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Flächen nach Nutzungsart</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(stats.byType).map(([type, area]) => {
              const Icon = propertyIcons[type] || Building2
              const colors = typeColors[type] || 'bg-gray-100 text-gray-800 border-gray-200'

              return (
                <Card key={type} className={`border-2 ${colors}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5" />
                      <span className="text-2xl font-bold">{area.toFixed(1)} ha</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{type}</p>
                    {area > 0 && (
                      <p className="text-xs opacity-75 mt-1">
                        {((area / stats.totalArea) * 100).toFixed(1)}% der Gesamtfläche
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-bold mb-4">Schnellaktionen</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/grundstuecke/new"
              className="p-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">➕</div>
              <div className="font-semibold">Neues Grundstück</div>
              <div className="text-sm opacity-90 mt-1">Fläche hinzufügen</div>
            </a>

            <a
              href="/kontakte/new"
              className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="font-semibold">Neuer Kontakt</div>
              <div className="text-sm opacity-90 mt-1">Eigentümer/Pächter anlegen</div>
            </a>

            <a
              href="/karte"
              className="p-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">🗺️</div>
              <div className="font-semibold">Kartenansicht</div>
              <div className="text-sm opacity-90 mt-1">Alle Grundstücke auf der Karte</div>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
