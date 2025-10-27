import { User } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Luis Alberto Vega Moreno',
      role: 'Desarrollador',
      gradient: 'from-blue-500 to-blue-500'
    },
    {
      name: 'Brayan Isaac Caro Bolaño',
      role: 'Desarrollador',
      gradient: 'from-blue-500 to-blue-500'
    },
    {
      name: 'Harlevis Pacheco Torres',
      role: 'Desarrollador',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Jose Daniel Redondo Martinez',
      role: 'Desarrollador',
      gradient: 'from-blue-500 to-cyan-500'
    },
     {
      name: 'Ever Jose Arias Meriño',
      role: 'Desarrollador',
      gradient: 'from-blue-500 to-cyan-500'
    },
     {
      name: 'Oswaldo Rojano Mora',
      role: 'Desarrollador',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <section id="equipo" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Equipo de Desarrollo
            </h3>
            <p className="text-gray-400 text-lg">
              Proyecto desarrollado por estudiantes comprometidos con la sostenibilidad ambiental
            </p>
          </div>

          {/* Grid de miembros */}
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                {/* Efecto de brillo */}
                <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`bg-gradient-to-br ${member.gradient} p-3 rounded-lg shadow-lg`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-cyan-400 mb-1">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje adicional */}
          <div className="mt-10 text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl px-6 py-3">
              <p className="text-gray-300 text-sm">
                💧 Comprometidos con la <span className="text-cyan-400 font-semibold">Gestión Sostenible del Agua</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;