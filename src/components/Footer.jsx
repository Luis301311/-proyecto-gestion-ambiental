import { Waves, Github, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Simuladores',
      links: [
        { name: 'Parámetros Físicos', href: '#fisico' },
        { name: 'Parámetros Químicos', href: '#quimico' },
        { name: 'Parámetros Orgánicos', href: '#organico' }
      ]
    },
    {
      title: 'Proyecto',
      links: [
        { name: 'Sobre Nosotros', href: '#equipo' },
        { name: 'Documentación', href: '#' },
        { name: 'Contacto', href: '#' }
      ]
    }
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2.5 rounded-lg shadow-lg">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  STARX
                </h3>
                <p className="text-xs text-cyan-300/70">Water Treatment Simulator</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Simulador interactivo para el tratamiento de aguas residuales, 
              diseñado como estrategia para la gestión ambiental sostenible.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors border border-slate-700 hover:border-cyan-500/50"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors border border-slate-700 hover:border-cyan-500/50"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} STARX - Simulación del Tratamiento de Aguas Residuales. 
              <span className="block md:inline md:ml-1">Todos los derechos reservados.</span>
            </p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs border border-cyan-500/30">
                Sostenibilidad
              </span>
              <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-500/30">
                Agua
              </span>
              <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs border border-green-500/30">
                Medio Ambiente
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;