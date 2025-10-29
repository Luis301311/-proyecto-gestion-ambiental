import { Droplet, FlaskConical, Leaf, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import ParametrosQuimicos from '../pages/ParametrosQuimicos';
import ParametrosFisicos from '../pages/ParametrosFisicos';
import ParametrosOrganicos from '../pages/ParametrosOrganicos';

const SimulatorsSection = () => {
  const [activeSimulator, setActiveSimulator] = useState(null);
  
  const simulators = [
    {
      id: 'fisico',
      title: 'Parámetros Físicos',
      description: 'Evalúa el estado físico del agua residual',
      icon: Droplet,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      hoverBorder: 'hover:border-blue-500/60',
      buttonGradient: 'from-blue-600 to-cyan-600',
      buttonHover: 'hover:from-blue-500 hover:to-cyan-500',
      shadowColor: 'hover:shadow-cyan-500/50',
      parameters: [
        { name: 'Sólidos Totales', unit: 'mg/L' },
        { name: 'Turbidez', unit: 'NTU' },
        { name: 'Color y Aspecto', unit: '' },
        { name: 'Temperatura', unit: '°C' }
      ],
      dotColor: 'bg-cyan-400'
    },
    {
      id: 'quimico',
      title: 'Parámetros Químicos',
      description: 'Analiza las propiedades químicas del agua',
      icon: FlaskConical,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/60',
      buttonGradient: 'from-purple-600 to-pink-600',
      buttonHover: 'hover:from-purple-500 hover:to-pink-500',
      shadowColor: 'hover:shadow-purple-500/50',
      parameters: [
        { name: 'pH', unit: 'Acidez/Basicidad' },
        { name: 'Alcalinidad', unit: 'mg/L CaCO₃' },
        { name: 'Dureza del Agua', unit: 'mg/L CaCO₃' },
        { name: 'Sólidos Disueltos', unit: 'mg/L' }
      ],
      dotColor: 'bg-purple-400'
    },
    {
      id: 'organico',
      title: 'Parámetros Orgánicos',
      description: 'Mide la carga orgánica contaminante',
      icon: Leaf,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      hoverBorder: 'hover:border-green-500/60',
      buttonGradient: 'from-green-600 to-emerald-600',
      buttonHover: 'hover:from-green-500 hover:to-emerald-500',
      shadowColor: 'hover:shadow-green-500/50',
      parameters: [
        { name: 'DBO₅', unit: 'mg/L O₂' },
        { name: 'DQO', unit: 'mg/L O₂' },
        { name: 'COT', unit: 'Carbono Orgánico' },
        { name: 'Biodegradabilidad', unit: 'Índice' }
      ],
      dotColor: 'bg-green-400'
    }
  ];

  // Función para volver al menú principal
  const handleBackToMenu = () => {
    setActiveSimulator(null);
  };

  // Renderizar el simulador activo
  if (activeSimulator === 'quimico') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Botón de regreso */}
        <div className="container mx-auto max-w-7xl px-4 pt-8">
          <button
            onClick={handleBackToMenu}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Volver a Simuladores</span>
          </button>
        </div>
        
        {/* Componente del simulador */}
        <ParametrosQuimicos />
      </div>
    );
  }

  // Si necesitas agregar otros simuladores en el futuro:
  if (activeSimulator === 'fisico') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto max-w-7xl px-4 pt-8">
          <button
            onClick={handleBackToMenu}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Volver a Simuladores</span>
          </button>
        </div>
        
        {/* Componente del simulador */}
        <ParametrosFisicos />
      </div>
    );
  }

  if (activeSimulator === 'organico') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto max-w-7xl px-4 pt-8">
          <button
            onClick={handleBackToMenu}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Volver a Simuladores</span>
          </button>
        </div>
         <ParametrosOrganicos />
      </div>
    );
  }

  // Vista principal: Menú de selección de simuladores
  return (
    <section id="simuladores" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Módulos de Simulación
          </h3>
          <p className="text-gray-400 text-lg">
            Selecciona el tipo de parámetro que deseas analizar
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid md:grid-cols-3 gap-8">
          {simulators.map((simulator) => (
            <div key={simulator.id} className="group relative">
              {/* Efecto de brillo de fondo */}
              <div className={`absolute inset-0 bg-gradient-to-r ${simulator.gradient} rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Tarjeta principal */}
              <div className={`relative bg-slate-800/90 backdrop-blur-sm border ${simulator.borderColor} ${simulator.hoverBorder} rounded-2xl p-8 transition-all duration-300`}>
                
                {/* Icono */}
                <div className="flex justify-center mb-6">
                  <div className={`bg-gradient-to-br ${simulator.gradient} p-5 rounded-2xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <simulator.icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-white mb-3 text-center">
                  {simulator.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-400 text-center mb-6 text-sm">
                  {simulator.description}
                </p>

                {/* Lista de parámetros */}
                <div className="space-y-3 mb-8">
                  {simulator.parameters.map((param, index) => (
                    <div key={index} className="flex items-start text-gray-300">
                      <div className={`w-1.5 h-1.5 ${simulator.dotColor} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <span className="text-sm">{param.name}</span>
                        {param.unit && (
                          <span className="text-xs text-gray-500 ml-1">({param.unit})</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveSimulator(simulator.id)}
                  className={`w-full bg-gradient-to-r ${simulator.buttonGradient} text-white py-3 rounded-xl font-semibold ${simulator.buttonHover} transition-all duration-300 shadow-lg ${simulator.shadowColor} transform hover:scale-105`}
                >
                  Iniciar Simulación
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimulatorsSection;