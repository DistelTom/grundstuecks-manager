import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-green-800">GrundstücksManager</h1>
              <p className="text-xs text-muted-foreground">Enterprise Land Management</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/grundstuecke">
              <Button variant="outline">Grundstücke</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            🚀 MVP Version - Tonight's Build
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Landwirtschafts-Verwaltung der nächsten Generation
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Verwalten Sie Ihre Äcker, Wiesen und Wälder mit modernster Technologie. 
            Inspiriert von den besten Farm-Management-Tools, aber einfacher und fokussierter.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                🎯 Jetzt Starten
              </Button>
            </Link>
            <Link href="/grundstuecke">
              <Button size="lg" variant="outline">
                📋 Demo Ansehen
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                Flächenvewaltung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Alle Grundstücke auf einen Blick. Flurstücke, Grundbücher, Größen und Nutzungsarten.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Kontakte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Eigentümer, Pächter, Nachbarn - alle Kontakte mit Bankdaten für Pachtzahlungen.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Statistiken, Übersichten und Trends - alles was Sie für Entscheidungen brauchen.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                Kartenansicht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Interaktive Karte mit allen Grundstücken. Farbcodierung nach Nutzungsart.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📄</span>
                Dokumente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Grundbuchauszüge, Pachtverträge und Karten - alles digital und organisiert.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Pacht & Finanzen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pachtverträge tracken, Zahlungen überwachen, Förderungen managen.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 p-8 bg-white rounded-lg shadow-sm border max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">🛠️ Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="font-semibold">Next.js 16</div>
              <div className="text-sm text-muted-foreground">App Router</div>
            </div>
            <div>
              <div className="font-semibold">TypeScript</div>
              <div className="text-sm text-muted-foreground">Type Safe</div>
            </div>
            <div>
              <div className="font-semibold">Prisma</div>
              <div className="text-sm text-muted-foreground">PostgreSQL</div>
            </div>
            <div>
              <div className="font-semibold">shadcn/ui</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-green-600 text-white border-0 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Bereit loszulegen?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-green-50">
                Starten Sie jetzt mit Ihrem Dashboard und verwalten Sie Ihre Flächen professionell.
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
                  Zum Dashboard →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>🌾 GrundstücksManager - Gebaut mit ❤️ für deutsche Landwirtschaft</p>
          <p className="text-sm mt-2">Next.js 16 • Prisma • PostgreSQL • shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}
