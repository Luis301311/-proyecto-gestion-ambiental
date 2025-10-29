import { useState, useEffect, useRef } from "react";

function ParametrosFisicos() {
  const [solidos, setSolidos] = useState(50);
  const [turbidez, setTurbidez] = useState(30);
  const [color, setColor] = useState("azul");
  const [olor, setOlor] = useState("Aceptable");
  const [temperatura, setTemperatura] = useState(20);

  const chartRef = useRef(null);

  // --- Clasificaciones ---
  const clasificarSolidos = (v) =>
    v < 50
      ? { estado: "Bajo", color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" }
      : v < 100
      ? { estado: "Moderado", color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.3)" }
      : { estado: "Alto", color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)" };

  const clasificarTurbidez = (v) =>
    v < 30
      ? { estado: "Baja", color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" }
      : v < 70
      ? { estado: "Media", color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.3)" }
      : { estado: "Alta", color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)" };

  const clasificarTemperatura = (v) =>
    v < 15
      ? { estado: "Fría", color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.3)" }
      : v < 30
      ? { estado: "Templada", color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" }
      : { estado: "Caliente", color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)" };

  // Dibujar gráfica
  const drawChart = () => {
    const canvas = chartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const data = [
      { label: 'Sólidos', value: solidos, max: 200, unit: 'mg/L', color: clasificarSolidos(solidos).color },
      { label: 'Turbidez', value: turbidez, max: 100, unit: '%', color: clasificarTurbidez(turbidez).color },
      { label: 'Temperatura', value: temperatura, max: 40, unit: '°C', color: clasificarTemperatura(temperatura).color }
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
      
      // Usar el color específico de cada parámetro
      const baseColor = item.color;
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.5, baseColor + 'dd');
      gradient.addColorStop(1, baseColor + 'aa');
      
      ctx.fillStyle = gradient;
      
      // Función para rectángulos redondeados
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
      const displayValue = Math.round(item.value);
      ctx.fillText(`${displayValue}${item.unit}`, x + barWidth / 2, y - 8);
    });
  };

  // Efecto para dibujar la gráfica cuando cambian los parámetros
  useEffect(() => {
    drawChart();
  }, [solidos, turbidez, temperatura]);

  const randomizar = () => {
    setSolidos(Math.floor(Math.random() * 200));
    setTurbidez(Math.floor(Math.random() * 100));
    setTemperatura(Math.floor(Math.random() * 40));
    setColor(["azul", "amarillo", "marron"][Math.floor(Math.random() * 3)]);
    setOlor(Math.random() > 0.5 ? "Aceptable" : "Desagradable");
  };

  const resetear = () => {
    setSolidos(50);
    setTurbidez(30);
    setColor("azul");
    setOlor("Aceptable");
    setTemperatura(20);
  };

  const tarjetas = [
    {
      titulo: "Sólidos Totales",
      valor: `${solidos} mg/L`,
      clasificacion: clasificarSolidos(solidos),
      porcentaje: (solidos / 200) * 100,
    },
    {
      titulo: "Turbidez",
      valor: `${turbidez} %`,
      clasificacion: clasificarTurbidez(turbidez),
      porcentaje: (turbidez / 100) * 100,
    },
    {
      titulo: "Temperatura",
      valor: `${temperatura} °C`,
      clasificacion: clasificarTemperatura(temperatura),
      porcentaje: (temperatura / 40) * 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 p-6 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-600/30 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Simulación: Parámetros Físicos del Agua
          </h1>
          <p className="text-slate-300 text-lg">
            Herramienta interactiva para análisis de calidad del agua
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel de Control */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Panel de Control</h2>
            <p className="text-slate-300 mb-6">
              Ajusta los parámetros usando los controles deslizantes para observar cambios en tiempo real.
            </p>

            <div className="space-y-4 mb-8">
              {/* Sólidos Totales */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Sólidos Totales (mg/L)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={solidos}
                    onChange={(e) => setSolidos(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={solidos}
                    onChange={(e) => setSolidos(Number(e.target.value))}
                    className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                  />
                </div>
              </div>

              {/* Turbidez */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Turbidez (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={turbidez}
                    onChange={(e) => setTurbidez(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={turbidez}
                    onChange={(e) => setTurbidez(Number(e.target.value))}
                    className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                  />
                </div>
              </div>

              {/* Color */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Color
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
                  >
                    <option value="azul">Azul claro</option>
                    <option value="amarillo">Amarillo</option>
                    <option value="marron">Marrón rojizo</option>
                  </select>
                </div>
              </div>

              {/* Olor */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Sabor y Olor
                  </label>
                  <select
                    value={olor}
                    onChange={(e) => setOlor(e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
                  >
                    <option value="Aceptable">Aceptable</option>
                    <option value="Desagradable">Desagradable</option>
                  </select>
                </div>
              </div>

              {/* Temperatura */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Temperatura (°C)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={temperatura}
                    onChange={(e) => setTemperatura(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={temperatura}
                    onChange={(e) => setTemperatura(Number(e.target.value))}
                    className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
              <button
                onClick={randomizar}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-400 hover:to-cyan-400 transition-all transform hover:scale-105 shadow-lg"
              >
                🎲 Valores Aleatorios
              </button>
              <button
                onClick={resetear}
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-xl font-semibold hover:from-slate-500 hover:to-slate-400 transition-all transform hover:scale-105 shadow-lg"
              >
                ↻ Restablecer
              </button>
              <span className="text-slate-400 text-sm ml-auto">
                ⚡ Actualización en tiempo real
              </span>
            </div>

            <hr className="border-slate-600/50 my-6" />

            {/* Indicadores de Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {tarjetas.map((tarjeta, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30"
                  style={{
                    backgroundColor: tarjeta.clasificacion.bgColor,
                    borderColor: tarjeta.clasificacion.borderColor
                  }}
                >
                  <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                    {tarjeta.titulo}
                  </small>
                  <div className="text-xl font-bold my-2 text-white">{tarjeta.valor}</div>
                  <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${tarjeta.porcentaje}%`,
                        backgroundColor: tarjeta.clasificacion.color
                      }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium" style={{ color: tarjeta.clasificacion.color }}>
                    {tarjeta.clasificacion.estado}
                  </div>
                </div>
              ))}

              {/* Color */}
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Color
                </small>
                <div className="text-xl font-bold my-2 text-white capitalize">{color}</div>
                <div className="text-sm text-slate-300">
                  {color === 'azul' && 'Agua clara y limpia'}
                  {color === 'amarillo' && 'Presencia de minerales'}
                  {color === 'marron' && 'Posible contaminación'}
                </div>
              </div>

              {/* Olor */}
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Sabor y Olor
                </small>
                <div className="text-xl font-bold my-2 text-white">{olor}</div>
                <div className="text-sm text-slate-300">
                  {olor === 'Aceptable' && 'Sin olores desagradables'}
                  {olor === 'Desagradable' && 'Posible contaminación orgánica'}
                </div>
              </div>
            </div>

            {/* Gráfica Canvas */}
            <div className="bg-slate-700/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4 text-white">Comparativa de Parámetros</h3>
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
            <h3 className="text-xl font-bold mb-4">Guía de Parámetros</h3>
            
            <div className="space-y-3 mb-6">
              <div className="text-slate-300 text-sm">
                <strong className="text-blue-400">Sólidos Totales:</strong> Concentración de partículas suspendidas o disueltas en el agua.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-blue-400">Turbidez:</strong> Medida de la claridad del agua, indica presencia de partículas en suspensión.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-blue-400">Color:</strong> Indica presencia de compuestos orgánicos, metales u otros contaminantes.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-blue-400">Sabor y Olor:</strong> Reflejan la presencia de contaminación orgánica o química.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-blue-400">Temperatura:</strong> Afecta el oxígeno disuelto y la actividad biológica en el agua.
              </div>
            </div>

            <h4 className="font-semibold mb-3 mt-6">Instrucciones de Uso</h4>
            <div className="space-y-2 text-slate-300 text-sm">
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">1.</span>
                <span>Utiliza los controles deslizantes o ingresa valores numéricos directamente</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">2.</span>
                <span>Observa los indicadores de progreso y las clasificaciones en tiempo real</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">3.</span>
                <span>Analiza la gráfica de barras para comparar parámetros</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">4.</span>
                <span>Experimenta con diferentes valores para explorar escenarios</span>
              </div>
            </div>

            <hr className="border-slate-600/50 my-6" />

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-slate-300 text-sm">
              <strong className="text-yellow-400">Aviso Importante:</strong> Esta es una herramienta educativa con fines demostrativos. Las clasificaciones y evaluaciones son aproximadas y no sustituyen análisis profesionales de laboratorio certificado.
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
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}

export default ParametrosFisicos;