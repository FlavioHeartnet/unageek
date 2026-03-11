import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

const footerLinks = {
  loja: [
    { href: "/produtos?game=pokemon", label: "Pokémon TCG" },
    { href: "/produtos?game=magic", label: "Magic: The Gathering" },
    { href: "/produtos?game=yugioh", label: "Yu-Gi-Oh!" },
    { href: "/produtos?category=accessory", label: "Acessórios" },
  ],
  ajuda: [
    { href: "#", label: "Como Comprar" },
    { href: "#", label: "Política de Trocas" },
    { href: "#", label: "Envio e Frete" },
    { href: "#", label: "Contato" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="font-display text-3xl tracking-wider">UNAGEEK</span>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              Sua loja especializada em cartas avulsas de TCG. Pokémon, Magic, Yu-Gi-Oh! e tudo que você precisa para dominar o jogo.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">LOJA</h4>
            <ul className="space-y-2">
              {footerLinks.loja.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">AJUDA</h4>
            <ul className="space-y-2">
              {footerLinks.ajuda.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pokeball-divider mt-10 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} UNAGEEK Store. Todos os direitos reservados.</p>
          <p className="text-border-light">
            Pokémon, Magic: The Gathering e Yu-Gi-Oh! são marcas registradas de seus respectivos proprietários.
          </p>
        </div>
      </div>
    </footer>
  );
}
