import { Target, Award, Users } from 'lucide-react';

const HeroSection = () => {
  const features = [
    {
      icon: Target,
      title: 'Precisión Técnica',
      description: 'Cálculos basados en normativas ambientales vigentes y metodologías científicas validadas.',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/20',
      hoverBorder: 'hover:border-cyan-500/50'
    },
    {
      icon: Award,
      title: 'Interfaz Intuitiva',
      description: 'Diseño moderno y fácil de usar que facilita el aprendizaje y la toma de decisiones.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/50'
    },
    {
      icon: Users,
      title: 'Educación Práctica',
      description: 'Herramienta ideal para estudiantes y profesionales en formación continua.',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/20',
      hoverBorder: 'hover:border-green-500/50'
    }
  ];

  return (
    <section id="inicio" className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Introducción Principal */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-block mb-6 animate-fade-in">
            <span className="bg-cyan-500/10 text-cyan-400 px-6 py-2 rounded-full text-sm font-semibold border border-cyan-500/30 backdrop-blur-sm">
              Gestión Ambiental Sostenible
            </span>
          </div>

          {/* Título Principal */}
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Simulación del Tratamiento
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              de Aguas Residuales
            </span>
          </h2>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Herramienta avanzada e interactiva para analizar, evaluar y optimizar 
            procesos de caracterización de aguas residuales mediante parámetros físicos, 
            químicos y orgánicos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm border ${feature.borderColor} ${feature.hoverBorder} rounded-2xl p-8 transition-all duration-300 transform hover:scale-105`}
            >
              {/* Icono */}
              <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>

              {/* Descripción */}
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;