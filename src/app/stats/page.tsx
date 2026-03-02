import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ['#fbbf24', '#22c55e', '#10b981', '#84cc16', '#f97316', '#a855f7', '#6b7280', '#3b82f6']

export default async function StatsPage() {
  // Fetch all data
  const [propertiesRes, statsRes] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/properties`, { cache: 'no-store' }),
    fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/dashboard/stats`, { cache: 'no-store' }),
  ])

  const properties = await propertiesRes.json()
  const stats = await statsRes.json()

  // Prepare chart data
  const typeData = Object.entries(stats.byType)
    .filter(([_, area]) => area > 0)
    .map(([type, area]) => ({
      name: type,
      value: area,
      hectares: area,
      percentage: ((area / stats.totalArea) * 100).toFixed(1),
    }))

  const municipalityData = properties.reduce((acc: any, p: any) => {
    const key = p.municipality || 'Unbekannt'
    if (!acc[key]) {
      acc[key] = { name: key, count: 0, area: 0 }
    }
    acc[key].count += 1
    acc[key].area += p.areaHa
    return acc
  }, {})

  const municipalityChartData = Object.values(municipalityData)
    .sort((a: any, b: any) => b.area - a.area)
    .slice(0, 10)

  // Size distribution
  const sizeDistribution = [
    { name: '< 5 ha', count: properties.filter((p: any) => p.areaHa < 5).length, area: properties.filter((p: any) => p.areaHa < 5).reduce((sum: number, p: any) => sum + p.areaHa, 0) },
    { name: '5-10 ha', count: properties.filter((p: any) => p.areaHa >= 5 && p.areaHa < 10).length, area: properties.filter((p: any) => p.areaHa >= 5 && p.areaHa < 10).reduce((sum: number, p: any) => sum + p.areaHa, 0) },
    { name: '10-20 ha', count: properties.filter((p: any) => p.areaHa >= 10 && p.areaHa < 20).length, area: properties.filter((p: any) => p.areaHa >= 10 && p.areaHa < 20).reduce((sum: number, p: any) => sum + p.areaHa, 0) },
    { name: '20-50 ha', count: properties.filter((p: any) => p.areaHa >= 20 && p.areaHa < 50).length, area: properties.filter((p: any) => p.areaHa >= 20 && p.areaHa < 50).reduce((sum: number, p: any) => sum + p.areaHa, 0) },
    { name: '> 50 ha', count: properties.filter((p: any) => p.areaHa >= 50).length, area: properties.filter((p: any) => p.areaHa >= 50).reduce((sum: number, p: any) => sum + p.areaHa, 0) },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-green-800">GrundstücksManager</h1>
              <p className="text-xs text-muted-foreground">Statistiken</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-700">Dashboard</a>
            <a href="/grundstuecke" className="text-sm font-medium text-gray-600 hover:text-green-700">Grundstücke</a>
            <a href="/stats" className="text-sm font-medium text-green-700">Statistiken</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Erweiterte Statistiken</h2>
          <p className="text-gray-600 mt-2">Detaillierte Analysen Ihrer Grundstücke</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">{stats.totalArea.toFixed(1)} ha</div>
              <p className="text-sm text-muted-foreground">Gesamtfläche</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">{stats.totalProperties}</div>
              <p className="text-sm text-muted-foreground">Grundstücke</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">{stats.averageSize.toFixed(1)} ha</div>
              <p className="text-sm text-muted-foreground">Durchschnittsgröße</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">{municipalityChartData.length}</div>
              <p className="text-sm text-muted-foreground">Gemeinden</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Property Type Distribution - Bar */}
          <Card>
            <CardHeader>
              <CardTitle>Flächen nach Nutzungsart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)} ha`, 'Fläche']} />
                  <Bar dataKey="hectares" fill="#166534" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Property Type Distribution - Pie */}
          <Card>
            <CardHeader>
              <CardTitle>Anteil nach Nutzungsart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)} ha`, 'Fläche']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Municipalities */}
          <Card>
            <CardHeader>
              <CardTitle>Flächen nach Gemeinde</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={municipalityChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number, name: string) => [
                    name === 'area' ? `${value.toFixed(1)} ha` : value,
                    name === 'area' ? 'Fläche' : 'Anzahl'
                  ]} />
                  <Legend />
                  <Bar dataKey="area" fill="#22c55e" name="Fläche (ha)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Size Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Größenverteilung</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sizeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#fbbf24" name="Anzahl" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailübersicht nach Nutzungsart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nutzungsart</th>
                    <th className="text-right p-2">Fläche (ha)</th>
                    <th className="text-right p-2">Anteil %</th>
                    <th className="text-right p-2">Grundstücke</th>
                  </tr>
                </thead>
                <tbody>
                  {typeData.map((item: any) => (
                    <tr key={item.name} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="text-right p-2">{item.hectares.toFixed(1)} ha</td>
                      <td className="text-right p-2">{item.percentage}%</td>
                      <td className="text-right p-2">
                        {properties.filter((p: any) => p.type === item.name).length}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b-2 font-bold">
                    <td className="p-2">Gesamt</td>
                    <td className="text-right p-2">{stats.totalArea.toFixed(1)} ha</td>
                    <td className="text-right p-2">100%</td>
                    <td className="text-right p-2">{stats.totalProperties}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
