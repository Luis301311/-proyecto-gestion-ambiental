import { useState, useEffect, useRef } from "react";

export default function ParametrosOrganicos() {
  const [selectedInfo, setSelectedInfo] = useState("general");
  const [toc, setToc] = useState(30);
  const [dbo, setDbo] = useState(25);
  const [dqo, setDqo] = useState(50);
  const [od, setOd] = useState(8);

  const chartRef = useRef(null);

  const infoContent = {
    general: {
      title: "Sistema de Tratamiento de Aguas Residuales",
      description:
        "Este simulador te permite entender cómo diferentes parámetros químicos y biológicos afectan la calidad del agua residual y su tratamiento.",
      importance:
        "El monitoreo de estos parámetros es crucial para garantizar que el agua tratada cumpla con las normas ambientales antes de ser liberada.",
      effects:
        "Los valores fuera de rango pueden causar daños al ecosistema, muerte de peces y problemas de salud pública.",
    },
    toc: {
      title: "Carbono Orgánico Total (TOC)",
      description: "Mide la cantidad de carbono presente en compuestos orgánicos disueltos.",
      importance: "Indica la cantidad de materia orgánica contaminante.",
      effects: "Niveles altos generan malos olores y crecimiento bacteriano excesivo.",
    },
    dbo: {
      title: "Demanda Bioquímica de Oxígeno (DBO)",
      description: "Mide el oxígeno que consumen microorganismos para descomponer materia orgánica.",
      importance: "Indicador clave de contaminación orgánica.",
      effects: "DBO alta agota oxígeno y mata organismos acuáticos.",
    },
    dqo: {
      title: "Demanda Química de Oxígeno (DQO)",
      description: "Oxígeno necesario para oxidar toda la materia presente.",
      importance: "Mide contaminación total.",
      effects: "Valores elevados indican compuestos tóxicos.",
    },
    od: {
      title: "Oxígeno Disuelto (OD)",
      description: "Oxígeno molecular en el agua, vital para organismos acuáticos.",
      importance: "Fundamental para peces y plantas acuáticas.",
      effects: "Bajos niveles causan mortandad y malos olores.",
    },
  };

  const evaluarEstado = (valor, valorOptimo, tipo = "normal") => {
    if (tipo === "normal") {
      if (valor <= valorOptimo * 0.7) 
        return { texto: "Bajo", color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" };
      if (valor > valorOptimo * 0.7 && valor <= valorOptimo * 1.3) 
        return { texto: "Moderado", color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.3)" };
      return { texto: "Alto", color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)" };
    } else {
      if (valor < valorOptimo * 0.8) 
        return { texto: "Crítico", color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)" };
      if (valor >= valorOptimo * 0.8 && valor <= valorOptimo * 1.2) 
        return { texto: "Moderado", color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.3)" };
      return { texto: "Óptimo", color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" };
    }
  };

  const drawChart = () => {
    const canvas = chartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const data = [
      { label: 'TOC', value: toc, max: 200, unit: 'mg/L', color: evaluarEstado(toc, 30).color },
      { label: 'DBO₅', value: dbo, max: 150, unit: 'mg/L', color: evaluarEstado(dbo, 25).color },
      { label: 'DQO', value: dqo, max: 300, unit: 'mg/L', color: evaluarEstado(dqo, 50).color },
      { label: 'OD', value: od, max: 12, unit: 'mg/L', color: evaluarEstado(od, 8, 'inverso').color }
    ];
    
    const padding = 50;
    const barWidth = (width - padding * 2) / data.length * 0.7;
    const maxBarHeight = height - padding * 2;
    
    data.forEach((item, index) => {
      const x = padding + index * ((width - padding * 2) / data.length) + 
                ((width - padding * 2) / data.length - barWidth) / 2;
      
      const normalizedValue = item.value / item.max;
      const barHeight = normalizedValue * maxBarHeight;
      const y = height - padding - barHeight;
      
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      const baseColor = item.color;
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.5, baseColor + 'dd');
      gradient.addColorStop(1, baseColor + 'aa');
      
      ctx.fillStyle = gradient;
      
      ctx.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
      };
      
      ctx.roundRect(x, y, barWidth, barHeight, 4);
      ctx.fill();
      
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, height - 20);
      
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(`${Math.round(item.value)}${item.unit}`, x + barWidth / 2, y - 8);
    });
  };

  useEffect(() => {
    drawChart();
  }, [toc, dbo, dqo, od]);

  const handleRandomize = () => {
    setToc(Math.floor(Math.random() * 180 + 10));
    setDbo(Math.floor(Math.random() * 130 + 10));
    setDqo(Math.floor(Math.random() * 280 + 20));
    setOd(Math.floor(Math.random() * 10 + 2));
  };

  const handleReset = () => {
    setToc(30);
    setDbo(25);
    setDqo(50);
    setOd(8);
  };

  const estadoToc = evaluarEstado(toc, 30);
  const estadoDbo = evaluarEstado(dbo, 25);
  const estadoDqo = evaluarEstado(dqo, 50);
  const estadoOd = evaluarEstado(od, 8, 'inverso');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 p-6 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-600/30 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            🌊 Simulador de Parámetros Orgánicos
          </h1>
          <p className="text-slate-300 text-lg">
            Explora cómo los parámetros afectan la calidad del agua y el medio ambiente
          </p>
        </header>

        {/* Botonera */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(infoContent).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedInfo(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg ${
                selectedInfo === key
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Info Panel */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            {infoContent[selectedInfo].title}
          </h2>
          <div className="space-y-3 text-slate-300">
            <p>
              <strong className="text-emerald-400">Descripción:</strong>{" "}
              {infoContent[selectedInfo].description}
            </p>
            <p>
              <strong className="text-emerald-400">Importancia:</strong>{" "}
              {infoContent[selectedInfo].importance}
            </p>
            <p>
              <strong className="text-emerald-400">Efectos:</strong>{" "}
              {infoContent[selectedInfo].effects}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel Principal */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>
            <p className="text-slate-300 mb-6">
              Ajusta los parámetros orgánicos para observar su impacto en la calidad del agua.
            </p>

            {/* Controles */}
            <div className="space-y-4 mb-8">
              {/* TOC */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-green-500/50 transition-colors">
                <label className="min-w-[200px] text-slate-300 font-medium">
                  🧪 TOC (mg/L)
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={toc}
                  onChange={(e) => setToc(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={toc}
                  onChange={(e) => setToc(Number(e.target.value))}
                  className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                />
              </div>

              {/* DBO */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-green-500/50 transition-colors">
                <label className="min-w-[200px] text-slate-300 font-medium">
                  ⚗️ DBO₅ (mg/L)
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={dbo}
                  onChange={(e) => setDbo(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={dbo}
                  onChange={(e) => setDbo(Number(e.target.value))}
                  className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                />
              </div>

              {/* DQO */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-green-500/50 transition-colors">
                <label className="min-w-[200px] text-slate-300 font-medium">
                  🧫 DQO (mg/L)
                </label>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={dqo}
                  onChange={(e) => setDqo(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={dqo}
                  onChange={(e) => setDqo(Number(e.target.value))}
                  className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                />
              </div>

              {/* OD */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-green-500/50 transition-colors">
                <label className="min-w-[200px] text-slate-300 font-medium">
                  🐟 Oxígeno Disuelto (mg/L)
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={od}
                  onChange={(e) => setOd(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={od}
                  onChange={(e) => setOd(Number(e.target.value))}
                  className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
              <button
                onClick={handleRandomize}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-400 hover:to-emerald-400 transition-all transform hover:scale-105 shadow-lg"
              >
                🎲 Valores Aleatorios
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-xl font-semibold hover:from-slate-500 hover:to-slate-400 transition-all transform hover:scale-105 shadow-lg"
              >
                ↻ Restablecer
              </button>
              <span className="text-slate-400 text-sm ml-auto">
                ⚡ Actualización en tiempo real
              </span>
            </div>

            <hr className="border-slate-600/50 my-6" />

            {/* Tarjetas de Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* TOC */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: estadoToc.bgColor,
                  borderColor: estadoToc.borderColor,
                }}
              >
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  🧪 TOC - Materia orgánica total
                </small>
                <div className="text-xl font-bold my-2 text-white">
                  {toc} mg/L
                </div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(toc / 200) * 100}%`,
                      backgroundColor: estadoToc.color,
                    }}
                  ></div>
                </div>
                <div className="text-sm font-medium" style={{ color: estadoToc.color }}>
                  {estadoToc.texto}
                </div>
              </div>

              {/* DBO */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: estadoDbo.bgColor,
                  borderColor: estadoDbo.borderColor,
                }}
              >
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  ⚗️ DBO₅ - Oxígeno consumido
                </small>
                <div className="text-xl font-bold my-2 text-white">
                  {dbo} mg/L
                </div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(dbo / 150) * 100}%`,
                      backgroundColor: estadoDbo.color,
                    }}
                  ></div>
                </div>
                <div className="text-sm font-medium" style={{ color: estadoDbo.color }}>
                  {estadoDbo.texto}
                </div>
              </div>

              {/* DQO */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: estadoDqo.bgColor,
                  borderColor: estadoDqo.borderColor,
                }}
              >
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  🧫 DQO - Oxidación química total
                </small>
                <div className="text-xl font-bold my-2 text-white">
                  {dqo} mg/L
                </div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(dqo / 300) * 100}%`,
                      backgroundColor: estadoDqo.color,
                    }}
                  ></div>
                </div>
                <div className="text-sm font-medium" style={{ color: estadoDqo.color }}>
                  {estadoDqo.texto}
                </div>
              </div>

              {/* OD */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: estadoOd.bgColor,
                  borderColor: estadoOd.borderColor,
                }}
              >
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  🐟 OD - Disponible para vida acuática
                </small>
                <div className="text-xl font-bold my-2 text-white">
                  {od} mg/L
                </div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(od / 12) * 100}%`,
                      backgroundColor: estadoOd.color,
                    }}
                  ></div>
                </div>
                <div className="text-sm font-medium" style={{ color: estadoOd.color }}>
                  {estadoOd.texto}
                </div>
              </div>
            </div>

            {/* Gráfica Canvas */}
            <div className="bg-slate-700/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Comparativa de Parámetros Orgánicos
              </h3>
              <canvas
                ref={chartRef}
                width={600}
                height={220}
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Información del Parámetro</h3>

            <div className="space-y-3 mb-6">
              <div className="text-slate-300 text-sm">
                <strong className="text-green-400">TOC:</strong> Carbono orgánico total presente en el agua.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-green-400">DBO₅:</strong> Oxígeno que necesitan los microorganismos.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-green-400">DQO:</strong> Oxidación química de toda la materia presente.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-green-400">OD:</strong> Oxígeno disuelto vital para organismos acuáticos.
              </div>
            </div>

            <h4 className="font-semibold mb-3 mt-6">Instrucciones de Uso</h4>
            <div className="space-y-2 text-slate-300 text-sm">
              <div className="flex items-start">
                <span className="text-green-400 mr-2">1.</span>
                <span>Selecciona un parámetro en la botonera superior para ver información detallada</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">2.</span>
                <span>Ajusta los valores con los controles deslizantes</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">3.</span>
                <span>Observa cómo cambian los estados y la gráfica en tiempo real</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">4.</span>
                <span>Usa "Valores Aleatorios" para explorar diferentes escenarios</span>
              </div>
            </div>

            <hr className="border-slate-600/50 my-6" />

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-slate-300 text-sm">
              <strong className="text-yellow-400">Aviso Importante:</strong> Esta es una herramienta educativa con fines demostrativos. Las clasificaciones son aproximadas y no sustituyen análisis profesionales de laboratorio certificado.
            </div>
          </div>
        </div>
      </div>

      {/* Estilos para los sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #10b981, #34d399);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #10b981, #34d399);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}