import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PainterSearch } from '@/components/painters/PainterSearch'
import { CreateProjectForm } from '@/components/projects/CreateProjectForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Briefcase, Search, Plus, MessageCircle, Star } from 'lucide-react'

export const Dashboard = () => {
  const { profile, signOut } = useAuth()

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Carregando...</h2>
        </div>
      </div>
    )
  }

  const isClient = profile.role === 'client'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">PaintConnect</h1>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{profile.full_name}</p>
                <p className="text-sm text-muted-foreground">
                  {isClient ? 'Cliente' : 'Pintor Profissional'}
                </p>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isClient ? (
          /* Cliente Dashboard */
          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="search" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Buscar Pintores</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Criar Projeto</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>Meus Projetos</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Mensagens</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <PainterSearch />
            </TabsContent>

            <TabsContent value="create">
              <CreateProjectForm />
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Projetos</CardTitle>
                  <CardDescription>
                    Acompanhe o progresso dos seus projetos de pintura
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Você ainda não tem projetos. Crie seu primeiro projeto para começar!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Mensagens</CardTitle>
                  <CardDescription>
                    Converse com os pintores sobre seus projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma conversa iniciada ainda.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* Pintor Dashboard */
          <Tabs defaultValue="opportunities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="opportunities" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Oportunidades</span>
              </TabsTrigger>
              <TabsTrigger value="proposals" className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>Minhas Propostas</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Meu Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Avaliações</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities">
              <Card>
                <CardHeader>
                  <CardTitle>Projetos Disponíveis</CardTitle>
                  <CardDescription>
                    Encontre projetos que combinam com suas habilidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Complete seu perfil de pintor para ver oportunidades de projetos.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="proposals">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Propostas</CardTitle>
                  <CardDescription>
                    Acompanhe o status das suas propostas enviadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Você ainda não enviou nenhuma proposta.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Meu Perfil Profissional</CardTitle>
                  <CardDescription>
                    Complete seu perfil para atrair mais clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Configure seu perfil profissional para começar a receber propostas de trabalho.
                    </p>
                    <Button>Completar Perfil</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações dos Clientes</CardTitle>
                  <CardDescription>
                    Veja o feedback dos seus clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma avaliação ainda. Complete trabalhos para receber avaliações!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}