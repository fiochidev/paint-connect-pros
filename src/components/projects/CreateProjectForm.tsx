import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarDays, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

export const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    estimated_budget: '',
    preferred_start_date: null as Date | null
  })
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: 'Erro',
        description: 'Você precisa estar logado para criar um projeto',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('create-project', {
        body: {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          estimated_budget: formData.estimated_budget ? parseFloat(formData.estimated_budget) : null,
          preferred_start_date: formData.preferred_start_date?.toISOString().split('T')[0]
        }
      })

      if (error) throw error

      toast({
        title: 'Projeto criado com sucesso!',
        description: 'Seu projeto foi publicado e os pintores poderão enviar propostas'
      })

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        estimated_budget: '',
        preferred_start_date: null
      })

    } catch (error: any) {
      toast({
        title: 'Erro ao criar projeto',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Criar Novo Projeto</CardTitle>
        <CardDescription>
          Descreva seu projeto de pintura para receber propostas de pintores qualificados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Projeto *</Label>
            <Input
              id="title"
              placeholder="Ex: Pintura externa de casa residencial"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição Detalhada *</Label>
            <Textarea
              id="description"
              placeholder="Descreva detalhadamente o trabalho de pintura necessário, incluindo área aproximada, tipo de tinta desejada, preparação necessária, etc."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localização *</Label>
            <Input
              id="location"
              placeholder="Ex: Bairro Centro, São Paulo - SP"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento Estimado (R$)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="0,00"
                value={formData.estimated_budget}
                onChange={(e) => handleChange('estimated_budget', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Data Preferencial de Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {formData.preferred_start_date ? (
                      format(formData.preferred_start_date, 'dd/MM/yyyy', { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.preferred_start_date || undefined}
                    onSelect={(date) => handleChange('preferred_start_date', date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Fotos do Local (Opcional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Adicione fotos do local para ajudar os pintores a entender melhor o projeto
              </p>
              <Button variant="outline" size="sm" disabled>
                Adicionar Fotos (Em breve)
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Criando projeto...' : 'Publicar Projeto'}
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Salvar Rascunho
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}