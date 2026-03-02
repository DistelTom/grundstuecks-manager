'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, X } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewDocumentPage({
  params,
}: {
  params: { propertyId: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    if (selectedFile) {
      formData.append('file', selectedFile)
    }

    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      router.push(`/grundstuecke/${params.propertyId}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-green-800">GrundstücksManager</h1>
              <p className="text-xs text-muted-foreground">Dokument hochladen</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-700">Dashboard</a>
            <a href="/grundstuecke" className="text-sm font-medium text-gray-600 hover:text-green-700">Grundstücke</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href={`/grundstuecke/${params.propertyId}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Dokument hochladen</h2>
          <p className="text-gray-600 mt-2">Fügen Sie ein Dokument zum Grundstück hinzu</p>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="propertyId" value={params.propertyId} />

              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="z.B. Grundbuchauszug 2024"
                />
              </div>

              <div>
                <Label htmlFor="type">Dokumentart *</Label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="GRUNDBUCH">Grundbuchauszug</option>
                  <option value="KARTE">Karte / Flurkarte</option>
                  <option value="PACHTVERTRAG">Pachtvertrag</option>
                  <option value="KAUFVERTRAG">Kaufvertrag</option>
                  <option value="LUFTBILD">Luftbild</option>
                  <option value="BODENSCHAETZUNG">Bodenschätzung</option>
                  <option value="SUBVENTIONS_ANTRAG">Förderantrag</option>
                  <option value="STEUER">Steuerunterlagen</option>
                  <option value="SONSTIGES">Sonstiges</option>
                </select>
              </div>

              <div>
                <Label htmlFor="description">Beschreibung</Label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                  placeholder="Optionale Beschreibung..."
                />
              </div>

              <div>
                <Label htmlFor="documentDate">Dokumentdatum</Label>
                <Input
                  id="documentDate"
                  name="documentDate"
                  type="date"
                />
              </div>

              <div>
                <Label htmlFor="file">Datei *</Label>
                <div className="mt-2">
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {selectedFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>{selectedFile.name}</span>
                      <span className="text-muted-foreground">
                        ({(selectedFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Akzeptierte Formate: PDF, JPG, PNG, DOC, DOCX (max 10 MB)
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {loading ? 'Wird hochgeladen...' : 'Hochladen'}
                </Button>
                <Link href={`/grundstuecke/${params.propertyId}`}>
                  <Button type="button" variant="outline">
                    Abbrechen
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Dokumenten-Upload - MVP Version</h3>
                <p className="text-sm text-blue-800">
                  In dieser MVP-Version werden Datei-Informationen in der Datenbank gespeichert.
                  In der Produktionsversion werden Dateien zu Vercel Blob Storage hochgeladen
                  und können heruntergeladen/angezeigt werden.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
