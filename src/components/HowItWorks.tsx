import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageSquare, CheckCircle, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Encontre Pintores",
      description: "Busque por pintores na sua região, compare portfólios e avaliações de outros clientes.",
      color: "text-blue-500"
    },
    {
      icon: MessageSquare,
      title: "Solicite Orçamentos",
      description: "Descreva seu projeto, envie fotos e receba propostas personalizadas de profissionais qualificados.",
      color: "text-green-500"
    },
    {
      icon: CheckCircle,
      title: "Contrate & Acompanhe",
      description: "Escolha a melhor proposta, contrate o serviço e acompanhe o progresso do trabalho em tempo real.",
      color: "text-purple-500"
    },
    {
      icon: Star,
      title: "Avalie & Recomende",
      description: "Após a conclusão, avalie o trabalho e ajude outros clientes com sua experiência.",
      color: "text-yellow-500"
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como Funciona o PaintConnect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Um processo simples e seguro para conectar você com os melhores pintores da sua região
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="relative border-0 shadow-card hover:shadow-lg-custom transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;