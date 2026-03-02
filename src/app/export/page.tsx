'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet, File } from "lucide-react"

export default function ExportPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleExport = async (format: string, type?: string) => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({ format })
      if (type) params.append('type', type)

      const response = await fetch(`/api/export?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Export fehlgeschlagen')
      }

      // Get filename from header
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = `export-${Date.now()}.${format}`
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/)
        if (match) filename = match[1]
      }

      // Download file
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const exportOptions = [
    {
      title: 'Alle Grundstücke (CSV)',
      description: 'Export aller Grundstücke mit allen Details',
      icon: FileSpreadsheet,
      format: 'csv',
      type: undefined,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Ackerflächen (CSV)',
      description: 'Nur Ackerflächen exportieren',
      icon: FileSpreadsheet,
      format: 'csv',
      type: 'ACKER',
      color: 'bg-yellow-600 hover:bg-yellow-700',
    },
    {
      title: 'Wiesen (CSV)',
      description: 'Nur Wiesen exportieren',
      icon: FileSpreadsheet,
      format: 'csv',
      type: 'WIESE',
      color: 'bg-lime-600 hover:bg-lime-700',
    },
    {
      title: 'Waldflächen (CSV)',
      description: 'Nur Waldflächen exportieren',
      icon: FileSpreadsheet,
      format: 'csv',
      type: 'WALD',
      color: 'bg-emerald-600 hover:bg-emerald-700',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-green-800">GrundstücksManager</h1>
              <p className="text-xs text-muted-foreground">Export</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-700">Dashboard</a>
            <a href="/grundstuecke" className="text-sm font-medium text-gray-600 hover:text-green-700">Grundstücke</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Export</h2>
          <p className="text-gray-600 mt-2">
            Exportieren Sie Ihre Daten in verschiedenen Formaten
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Export Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {exportOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card key={option.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  <Button
                    onClick={() => handleExport(option.format, option.type)}
                    className={option.color}
                    disabled={loading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? 'Wird exportiert...' : 'Exportieren'}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <File className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Export-Format: CSV</h3>
                <p className="text-sm text-blue-800 mb-2">
                  CSV-Dateien können in Excel, Google Sheets oder anderen Tabellenkalkulationen
                  geöffnet werden. Die Dateien verwenden Semikolons (;) als Trennzeichen
                  für die deutsche Excel-Kompatibilität.
                </p>
                <h4 className="font-semibold text-blue-900 mb-1">Enthaltene Daten:</h4>
                <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                  <li>Flurstücksnummer, Grundbuch</li>
                  <li>Lage (Gemeinde, Gemarkung, Flur)</li>
                  <li>Größe (Hektar & m²)</li>
                  <li>Art, Bodengüte, Bewässerung</li>
                  <li>Eigentümer & Pächter</li>
                  <li>Pachtverträge & Kaufdaten</li>
                  <li>Status, Tags, Notizen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Formats */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Geplante Export-Formate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded bg-gray-50">
                <div className="font-semibold mb-1">PDF Berichte</div>
                <p className="text-sm text-muted-foreground">
                  Professionelle PDF-Berichte für Behörden, Banken, etc.
                </p>
                <div className="text-xs text-orange-600 mt-2">In Planung</div>
              </div>
              <div className="p-4 border rounded bg-gray-50">
                <div className="font-semibold mb-1">Flächennachweis</div>
                <p className="text-sm text-muted-foreground">
                  Offizieller Flächennachweis nach VDLUFA-Standard.
                </p>
                <div className="text-xs text-orange-600 mt-2">In Planung</div>
              </div>
              <div className="p-4 border rounded bg-gray-50">
                <div className="font-semibold mb-1">JSON API</div>
                <p className="text-sm text-muted-foreground">
                  Export aller Daten als JSON für Integrationen.
                </p>
                <div className="text-xs text-orange-600 mt-2">In Planung</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
