'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    // Identifikation
    parcelNumber: '',
    landRegistry: '',
    municipality: '',
    district: '',
    lot: '',
    location: '',
    areaHa: '',
    type: 'ACKER',
    soilQuality: '',
    irrigation: false,
    // Placeholder - wird ersetzt durch Contact Selector
    ownerId: 'placeholder-owner-id',
    tenantId: '',
    leaseStart: '',
    leaseEnd: '',
    leasePricePerHa: '',
    purchaseDate: '',
    purchasePrice: '',
    status: 'AKTIV',
    notes: '',
    tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = {
        ...formData,
        areaHa: parseFloat(formData.areaHa),
        leasePricePerHa: formData.leasePricePerHa ? parseFloat(formData.leasePricePerHa) : null,
        purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        ownerId: formData.ownerId || '00000000-0000-0000-0000-000000000001', // Default owner for now
        tenantId: formData.tenantId || null,
      }

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || errorData.error || 'Failed to create property')
      }

      const property = await res.json()
      router.push(`/grundstuecke/${property.id}`)
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
              <p className="text-xs text-muted-foreground">Neues Grundstück</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-700">Dashboard</Link>
            <Link href="/grundstuecke" className="text-sm font-medium text-green-700">Grundstücke</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/grundstuecke">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Neues Grundstück anlegen</h2>
          <p className="text-gray-600 mt-2">Füllen Sie die Daten aus</p>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit}>
          {/* Sektion 1: Identifikation */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Identifikation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parcelNumber">Flurstücksnummer *</Label>
                  <Input
                    id="parcelNumber"
                    required
                    placeholder="z.B. 123/45"
                    value={formData.parcelNumber}
                    onChange={(e) => setFormData({ ...formData, parcelNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="landRegistry">Grundbuchblatt *</Label>
                  <Input
                    id="landRegistry"
                    required
                    placeholder="z.B. GB 456"
                    value={formData.landRegistry}
                    onChange={(e) => setFormData({ ...formData, landRegistry: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="municipality">Gemeinde *</Label>
                  <Input
                    id="municipality"
                    required
                    placeholder="z.B. Ravenstein"
                    value={formData.municipality}
                    onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="district">Gemarkung</Label>
                  <Input
                    id="district"
                    placeholder="z.B. Ravenstein"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lot">Flur</Label>
                  <Input
                    id="lot"
                    placeholder="z.B. 5"
                    value={formData.lot}
                    onChange={(e) => setFormData({ ...formData, lot: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Lagebeschreibung</Label>
                <Input
                  id="location"
                  placeholder="z.B. An der Bundesstraße 123"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sektion 2: Fläche & Art */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Fläche & Art</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="areaHa">Größe in Hektar *</Label>
                  <Input
                    id="areaHa"
                    type="number"
                    step="0.01"
                    required
                    placeholder="z.B. 5.25"
                    value={formData.areaHa}
                    onChange={(e) => setFormData({ ...formData, areaHa: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Nutzungsart *</Label>
                  <select
                    id="type"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="ACKER">Acker</option>
                    <option value="WIESE">Wiese</option>
                    <option value="WALD">Wald</option>
                    <option value="WEIDE">Weide</option>
                    <option value="OBST">Obstplantage</option>
                    <option value="WEINBERG">Weinberg</option>
                    <option value="GEBAEUDE">Gebäude/Hofstelle</option>
                    <option value="SONSTIGES">Sonstiges</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="soilQuality">Bodengüte</Label>
                  <Input
                    id="soilQuality"
                    placeholder="z.B. A2, B3"
                    value={formData.soilQuality}
                    onChange={(e) => setFormData({ ...formData, soilQuality: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="irrigation"
                    checked={formData.irrigation}
                    onChange={(e) => setFormData({ ...formData, irrigation: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="irrigation">Bewässerung vorhanden</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sektion 3: Eigentum & Pacht */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Eigentum & Pacht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Eigentümer und Pächter werden in Kürze über einen Kontakt-Selector ausgewählt.
                Für jetzt wird ein Standard-Eigentümer verwendet.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leaseStart">Pachtbeginn</Label>
                  <Input
                    id="leaseStart"
                    type="date"
                    value={formData.leaseStart}
                    onChange={(e) => setFormData({ ...formData, leaseStart: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="leaseEnd">Pachtende</Label>
                  <Input
                    id="leaseEnd"
                    type="date"
                    value={formData.leaseEnd}
                    onChange={(e) => setFormData({ ...formData, leaseEnd: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leasePricePerHa">Pacht pro Hektar/Jahr (€)</Label>
                  <Input
                    id="leasePricePerHa"
                    type="number"
                    step="0.01"
                    placeholder="z.B. 350.00"
                    value={formData.leasePricePerHa}
                    onChange={(e) => setFormData({ ...formData, leasePricePerHa: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="AKTIV">Aktiv</option>
                    <option value="VERPAchtetET">Verpachtet</option>
                    <option value="BRACHLIEGEND">Brachliegend</option>
                    <option value="IN_PLANUNG">In Planung</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchaseDate">Kaufdatum</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="purchasePrice">Kaufpreis (€)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    step="0.01"
                    placeholder="z.B. 50000.00"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sektion 4: Notizen & Tags */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notizen & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Notizen</Label>
                <textarea
                  id="notes"
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  placeholder="Zusätzliche Informationen..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (kommagetrennt)</Label>
                <Input
                  id="tags"
                  placeholder="z.B. Bio, Vorzugsweise, Öko"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Wird gespeichert...' : 'Grundstück anlegen'}
            </Button>
            <Link href="/grundstuecke">
              <Button type="button" variant="outline" size="lg">
                Abbrechen
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
