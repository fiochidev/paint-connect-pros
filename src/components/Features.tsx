import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Users, 
  MapPin, 
  Star, 
  Shield, 
  Calendar,
  MessageCircle,
  Camera,
  Calculator,
  Clock
} from "lucide-react";

const Features = () => {
  const painterFeatures = [
    {
      icon: Users,
      title: "Perfil Profissional",
      description: "Crie um perfil completo com portfólio, especialidades e área de cobertura."
    },
    {
      icon: Camera,
      title: "Galeria de Trabalhos",
      description: "Mostre seus melhores projetos com fotos de alta qualidade."
    },
    {
      icon: Calendar,
      title: "Agenda Integrada",
      description: "Gerencie seus agendamentos e disponibilidade em tempo real."
    },
    {
      icon: Star,
      title: "Sistema de Avaliações",
      description: "Construa sua reputação com avaliações de clientes satisfeitos."
    }
  ];

  const clientFeatures = [
    {
      icon: MapPin,
      title: "Busca por Localização",
      description: "Encontre pintores qualificados na sua região com facilidade."
    },
    {
      icon: Calculator,
      title: "Múltiplos Orçamentos",
      description: "Compare propostas e escolha a melhor opção para seu projeto."
    },
    {
      icon: Shield,
      title: "Pintores Verificados",
      description: "Todos os profissionais passam por processo de verificação."
    },
    {
      icon: MessageCircle,
      title: "Chat Integrado",
      description: "Comunique-se diretamente com o pintor durante todo o projeto."
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recursos Para Cada Perfil
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas especializadas tanto para pintores profissionais quanto para clientes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Para Pintores */}
          <div id="para-pintores">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Para Pintores</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Expand seu negócio com ferramentas profissionais que facilitam o contato com novos clientes.
              </p>
              <Button variant="hero">Cadastrar como Pintor</Button>
            </div>

            <div className="grid gap-4">
              {painterFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="border-0 shadow-card hover:shadow-lg-custom transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Para Clientes */}
          <div id="para-clientes">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold">Para Clientes</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Encontre o pintor ideal para seu projeto com segurança e praticidade.
              </p>
              <Button variant="outline">Buscar Pintores</Button>
            </div>

            <div className="grid gap-4">
              {clientFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="border-0 shadow-card hover:shadow-lg-custom transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;