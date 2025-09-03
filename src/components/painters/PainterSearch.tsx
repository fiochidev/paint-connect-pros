import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Clock, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Painter {
  id: string
  business_name: string | null
  description: string | null
  experience_years: number | null
  specialties: string[] | null
  hourly_rate: number | null
  rating: number
  total_reviews: number
  users: {
    full_name: string
    city: string | null
    avatar_url: string | null
  }
}

export const PainterSearch = () => {
  const [painters, setPainters] = useState<Painter[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    city: '',
    maxPrice: '',
    minRating: '0',
    specialty: ''
  })

  const specialties = [
    'Pintura Interna',
    'Pintura Externa', 
    'Texturas Decorativas',
    'Pintura Comercial',
    'Restauração',
    'Verniz e Acabamentos'
  ]

  const searchPainters = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('search-painters', {
        body: {
          city: filters.city,
          maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : null,
          minRating: parseFloat(filters.minRating),
          specialties: filters.specialty ? [filters.specialty] : []
        }
      })

      if (error) throw error
      setPainters(data.painters || [])
    } catch (error) {
      console.error('Error searching painters:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchPainters()
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buscar Pintores</CardTitle>
          <CardDescription>
            Encontre o pintor profissional ideal para seu projeto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="Digite a cidade"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="maxPrice">Preço Máximo/Hora</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="R$ 0,00"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="minRating">Avaliação Mínima</Label>
              <Select value={filters.minRating} onValueChange={(value) => handleFilterChange('minRating', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Qualquer avaliação</SelectItem>
                  <SelectItem value="3">3+ estrelas</SelectItem>
                  <SelectItem value="4">4+ estrelas</SelectItem>
                  <SelectItem value="4.5">4.5+ estrelas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="specialty">Especialidade</Label>
              <Select value={filters.specialty} onValueChange={(value) => handleFilterChange('specialty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as especialidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as especialidades</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={searchPainters} disabled={loading} className="w-full md:w-auto">
            {loading ? 'Buscando...' : 'Buscar Pintores'}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {painters.map((painter) => (
          <Card key={painter.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {painter.users.avatar_url ? (
                    <img 
                      src={painter.users.avatar_url} 
                      alt={painter.users.full_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-primary">
                      {painter.users.full_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {painter.business_name || painter.users.full_name}
                  </CardTitle>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{painter.users.city || 'Cidade não informada'}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{painter.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">
                      ({painter.total_reviews} avaliações)
                    </span>
                  </div>
                  
                  {painter.hourly_rate && (
                    <div className="flex items-center space-x-1 text-primary font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>R$ {painter.hourly_rate}/h</span>
                    </div>
                  )}
                </div>

                {painter.experience_years && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{painter.experience_years} anos de experiência</span>
                  </div>
                )}

                {painter.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {painter.description}
                  </p>
                )}

                {painter.specialties && painter.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {painter.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {painter.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{painter.specialties.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <Button className="w-full mt-4">
                  Ver Perfil Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {painters.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhum pintor encontrado com os filtros selecionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}