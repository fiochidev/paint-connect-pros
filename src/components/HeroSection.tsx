import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin, Shield } from "lucide-react";
import heroImage from "@/assets/hero-painter.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-subtle pt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Conectando
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Pintores </span>
                e Clientes
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A plataforma que facilita a contratação de pintores profissionais qualificados para transformar sua casa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="shadow-glow"
                onClick={() => window.location.href = '/auth'}
              >
                Encontrar Pintores
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/auth'}
              >
                Sou Pintor
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Pintores Verificados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1.2k+</div>
                <div className="text-sm text-muted-foreground">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8/5</div>
                <div className="text-sm text-muted-foreground">Avaliação Média</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg-custom">
              <img 
                src={heroImage} 
                alt="Pintor profissional trabalhando"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <Card className="absolute top-8 -left-4 p-4 bg-white/95 backdrop-blur-sm shadow-card border-0">
              <div className="flex items-center space-x-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">Excelente avaliação</span>
              </div>
            </Card>

            <Card className="absolute bottom-8 -right-4 p-4 bg-white/95 backdrop-blur-sm shadow-card border-0">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Pintores Verificados</div>
                  <div className="text-xs text-muted-foreground">Documentação completa</div>
                </div>
              </div>
            </Card>

            <Card className="absolute top-1/2 -right-8 p-4 bg-white/95 backdrop-blur-sm shadow-card border-0">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Na sua região</div>
                  <div className="text-xs text-muted-foreground">Cobertura local</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;