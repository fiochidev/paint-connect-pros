import { Palette } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PaintConnect</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              Conectamos pintores profissionais com clientes que buscam qualidade e confiança em serviços de pintura residencial.
            </p>
            <div className="text-sm text-background/60">
              © 2024 PaintConnect. Todos os direitos reservados.
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Para Pintores</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">Cadastrar-se</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Suporte</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Para Clientes</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">Encontrar Pintores</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Como Contratar</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Ajuda</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>Feito com ❤️ para transformar casas em lares ainda mais bonitos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;