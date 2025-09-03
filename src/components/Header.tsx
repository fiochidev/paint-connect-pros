import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-foreground">PaintConnect</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">
              Como Funciona
            </a>
            <a href="#para-pintores" className="text-muted-foreground hover:text-primary transition-colors">
              Para Pintores
            </a>
            <a href="#para-clientes" className="text-muted-foreground hover:text-primary transition-colors">
              Para Clientes
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button variant="hero" size="sm">
              Cadastrar-se
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;