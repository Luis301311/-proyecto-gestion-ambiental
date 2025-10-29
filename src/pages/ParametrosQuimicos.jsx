import React, { useState, useEffect, useRef } from 'react';
import { FlaskConical } from 'lucide-react';

const ParametrosQuimicos = () => {
  // Estados para los parámetros
  const [parameters, setParameters] = useState({
    tds: 350,
    ph: 7.2,
    alk: 120,
    hard: 180
  });

  const chartRef = useRef(null);

  // Clasificadores de parámetros
  const classifiers = {
    tds(value) {
      if (value < 300) return ['Bajo', 'good', Math.min(100, (value / 300) * 100)];
      if (value <= 600) return ['Moderado', 'ok', Math.min(100, (1 - (value - 300) / 300) * 60 + 40)];
      return ['Alto', 'bad', Math.min(100, (value / 2000) * 100)];
    },
    
    ph(value) {
      if (value >= 6.5 && value <= 8.5) {
        const deviation = Math.abs(value - 7.0);
        return ['Neutro', 'good', Math.max(60, 100 - (deviation / 1.5) * 40)];
      }
      if (value < 6.5) return ['Ácido', 'bad', Math.max(10, (value / 6.5) * 50)];
      return ['Alcalino', 'bad', Math.max(10, 50 - ((value - 8.5) / 5.5) * 40)];
    },
    
    alkalinity(value) {
      if (value < 40) return ['Baja', 'bad', (value / 40) * 100];
      if (value <= 200) return ['Adecuada', 'good', Math.min(100, (value / 200) * 100)];
      return ['Alta', 'ok', Math.max(50, 100 - ((value - 200) / 300) * 50)];
    },
    
    hardness(value) {
      if (value < 60) return ['Blanda', 'good', Math.max(70, (value / 60) * 100)];
      if (value <= 120) return ['Moderada', 'ok', 80 - ((value - 60) / 60) * 20];
      if (value <= 180) return ['Dura', 'bad', 60 - ((value - 120) / 60) * 30];
      return ['Muy Dura', 'bad', Math.max(10, 30 - ((value - 180) / 320) * 20)];
    }
  };

  // Función para obtener gradiente según clasificación
  const getGradient = (classification) => {
    const gradients = {
      good: 'linear-gradient(135deg, #10b981, #34d399)',
      ok: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      bad: 'linear-gradient(135deg, #ef4444, #f87171)'
    };
    return gradients[classification] || gradients.bad;
  };

  // Cálculo de puntuación de calidad
  const calculateQualityScore = (tdsVal, phVal, alkVal, hardVal) => {
    let score = 100;
    
    if (tdsVal > 300) {
      score -= Math.min(30, ((tdsVal - 300) / 1700) * 50);
    }
    
    if (phVal < 6.5) {
      score -= ((6.5 - phVal) / 6.5) * 25;
    } else if (phVal > 8.5) {
      score -= ((phVal - 8.5) / 5.5) * 25;
    }
    
    if (alkVal < 40) {
      score -= ((40 - alkVal) / 40) * 20;
    } else if (alkVal > 200) {
      score -= ((alkVal - 200) / 300) * 15;
    }
    
    if (hardVal > 120) {
      score -= Math.min(25, ((hardVal - 120) / 380) * 25);
    }
    
    return Math.max(0, Math.round(score));
  };

  // Obtener clasificaciones actuales
  const getCurrentClassifications = () => {
    return {
      tds: classifiers.tds(parameters.tds),
      ph: classifiers.ph(parameters.ph),
      alk: classifiers.alkalinity(parameters.alk),
      hard: classifiers.hardness(parameters.hard)
    };
  };

  // Obtener calidad general
  const getQualityInfo = () => {
    const qualityScore = calculateQualityScore(parameters.tds, parameters.ph, parameters.alk, parameters.hard);
    let qualityText, qualityClass;
    
    if (qualityScore >= 75) {
      qualityText = 'Buena';
      qualityClass = 'good';
    } else if (qualityScore >= 50) {
      qualityText = 'Aceptable';
      qualityClass = 'ok';
    } else {
      qualityText = 'Mala';
      qualityClass = 'bad';
    }
    
    return { qualityText, qualityClass };
  };

  // Dibujar gráfica
  const drawChart = () => {
    const canvas = chartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const data = [
      { label: 'TDS', value: parameters.tds, max: 2000, unit: 'mg/L' },
      { label: 'pH', value: parameters.ph, max: 14, unit: '' },
      { label: 'Alcalinidad', value: parameters.alk, max: 500, unit: 'mg/L' },
      { label: 'Dureza', value: parameters.hard, max: 500, unit: 'mg/L' }
    ];
    
    const padding = 50;
    const barWidth = (width - padding * 2) / data.length * 0.7;
    const maxBarHeight = height - padding * 2;
    
    data.forEach((item, index) => {
      const x = padding + index * ((width - padding * 2) / data.length) + 
                ((width - padding * 2) / data.length - barWidth) / 2;
      
      let normalizedValue;
      if (item.label === 'pH') {
        normalizedValue = item.value / 14;
      } else {
        normalizedValue = item.value / item.max;
      }
      
      const barHeight = normalizedValue * maxBarHeight;
      const y = height - padding - barHeight;
      
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, '#06b6d4');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');
      
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
      const displayValue = item.label === 'pH' ? item.value.toFixed(1) : Math.round(item.value);
      ctx.fillText(`${displayValue}${item.unit}`, x + barWidth / 2, y - 8);
    });
  };

  // Efecto para dibujar la gráfica cuando cambian los parámetros
  useEffect(() => {
    drawChart();
  }, [parameters]);

  // Manejar cambios en los controles
  const handleParameterChange = (param, value) => {
    const numValue = Number(value);
    setParameters(prev => ({
      ...prev,
      [param]: numValue
    }));
  };

  // Valores aleatorios
  const handleRandomize = () => {
    setParameters({
      tds: Math.floor(Math.random() * 1800 + 50),
      ph: Number((Math.random() * 4 + 5).toFixed(1)),
      alk: Math.floor(Math.random() * 450 + 20),
      hard: Math.floor(Math.random() * 450 + 20)
    });
  };

  // Restablecer valores
  const handleReset = () => {
    setParameters({
      tds: 350,
      ph: 7.2,
      alk: 120,
      hard: 180
    });
  };

  const classifications = getCurrentClassifications();
  const { qualityText, qualityClass } = getQualityInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 p-6 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-600/30 shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl mr-4">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Simulación: Parámetros Químicos del Agua
            </h1>
          </div>
          <p className="text-slate-300 text-lg">
            Herramienta interactiva para análisis de calidad del agua
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel Principal */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>
            <p className="text-slate-300 mb-6">
              Ajusta los parámetros usando los controles deslizantes para observar cambios en tiempo real en la calidad del agua.
            </p>

            {/* Controles */}
            <div className="space-y-4 mb-8">
              {/* Control TDS */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Sólidos Disueltos Totales (mg/L)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="10"
                    value={parameters.tds}
                    onChange={(e) => handleParameterChange('tds', e.target.value)}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="0"
                    max="2000"
                    value={parameters.tds}
                    onChange={(e) => handleParameterChange('tds', e.target.value)}
                    className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                  />
                </div>
              </div>

              {/* Control pH */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Nivel de pH
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="14"
                    step="0.1"
                    value={parameters.ph}
                    onChange={(e) => handleParameterChange('ph', e.target.value)}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="0"
                    max="14"
                    step="0.1"
                    value={parameters.ph}
                    onChange={(e) => handleParameterChange('ph', e.target.value)}
                    className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                  />
                </div>
              </div>

              {/* Control Alcalinidad */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Alcalinidad (mg/L CaCO₃)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="5"
                    value={parameters.alk}
                    onChange={(e) => handleParameterChange('alk', e.target.value)}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={parameters.alk}
                    onChange={(e) => handleParameterChange('alk', e.target.value)}
                    className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                  />
                </div>
              </div>

              {/* Control Dureza */}
              <div className="control-group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-colors">
                  <label className="min-w-[200px] text-slate-300 font-medium">
                    Dureza Total (mg/L CaCO₃)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="5"
                    value={parameters.hard}
                    onChange={(e) => handleParameterChange('hard', e.target.value)}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={parameters.hard}
                    onChange={(e) => handleParameterChange('hard', e.target.value)}
                    className="w-20 p-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-center"
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
              <button
                onClick={handleRandomize}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all transform hover:scale-105 shadow-lg"
              >
                🎲 Valores Aleatorios
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-400 hover:to-pink-400 transition-all transform hover:scale-105 shadow-lg"
              >
                ↻ Restablecer
              </button>
              <span className="text-slate-400 text-sm ml-auto">
                ⚡ Actualización en tiempo real
              </span>
            </div>

            <hr className="border-slate-600/50 my-6" />

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* TDS Status */}
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Sólidos Disueltos
                </small>
                <div className="text-xl font-bold my-2">{parameters.tds} mg/L</div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${classifications.tds[2]}%`,
                      background: getGradient(classifications.tds[1])
                    }}
                  ></div>
                </div>
                <div className={`text-sm font-medium ${
                  classifications.tds[1] === 'good' ? 'text-green-400' :
                  classifications.tds[1] === 'ok' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {classifications.tds[0]}
                </div>
              </div>

              {/* pH Status */}
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Nivel de pH
                </small>
                <div className="text-xl font-bold my-2">{parameters.ph.toFixed(1)}</div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${classifications.ph[2]}%`,
                      background: getGradient(classifications.ph[1])
                    }}
                  ></div>
                </div>
                <div className={`text-sm font-medium ${
                  classifications.ph[1] === 'good' ? 'text-green-400' :
                  classifications.ph[1] === 'ok' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {classifications.ph[0]}
                </div>
              </div>

              {/* Alcalinidad Status */}
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Alcalinidad
                </small>
                <div className="text-xl font-bold my-2">{parameters.alk} mg/L</div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${classifications.alk[2]}%`,
                      background: getGradient(classifications.alk[1])
                    }}
                  ></div>
                </div>
                <div className={`text-sm font-medium ${
                  classifications.alk[1] === 'good' ? 'text-green-400' :
                  classifications.alk[1] === 'ok' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {classifications.alk[0]}
                </div>
              </div>

              {/* Dureza Status */}
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
                <small className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Dureza Total
                </small>
                <div className="text-xl font-bold my-2">{parameters.hard} mg/L</div>
                <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${classifications.hard[2]}%`,
                      background: getGradient(classifications.hard[1])
                    }}
                  ></div>
                </div>
                <div className={`text-sm font-medium ${
                  classifications.hard[1] === 'good' ? 'text-green-400' :
                  classifications.hard[1] === 'ok' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {classifications.hard[0]}
                </div>
              </div>
            </div>

            {/* Gráfica */}
            <div className="bg-slate-700/30 rounded-xl p-5 mb-6">
              <canvas 
                ref={chartRef}
                width={600}
                height={220}
                className="w-full rounded-lg"
              />
            </div>

            {/* Resumen de Calidad */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-700/30 p-5 rounded-xl border border-slate-600/30">
              <div>
                <h4 className="text-lg font-semibold">
                  Calidad Estimada: <span className={qualityClass === 'good' ? 'text-green-400' : qualityClass === 'ok' ? 'text-yellow-400' : 'text-red-400'}>
                    {qualityText}
                  </span>
                </h4>
                <p className="text-slate-400 text-sm">
                  Evaluación basada en la combinación de todos los parámetros
                </p>
              </div>
              <div className="flex gap-3 mt-4 sm:mt-0">
                <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium">
                  Mala
                </span>
                <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium">
                  Aceptable
                </span>
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium">
                  Buena
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Guía de Parámetros</h3>
            
            <div className="space-y-3 mb-6">
              <div className="text-slate-300 text-sm">
                <strong className="text-cyan-400">Sólidos Disueltos (TDS):</strong> Concentración total de minerales y sales disueltas en el agua (mg/L).
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-cyan-400">pH:</strong> Medida de acidez o alcalinidad en escala 0-14. Valor 7 es neutro.
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-cyan-400">Alcalinidad:</strong> Capacidad del agua para neutralizar ácidos (mg/L CaCO₃).
              </div>
              <div className="text-slate-300 text-sm">
                <strong className="text-cyan-400">Dureza:</strong> Concentración de calcio y magnesio que afecta la formación de espuma (mg/L CaCO₃).
              </div>
            </div>

            <h4 className="font-semibold mb-3 mt-6">Instrucciones de Uso</h4>
            <div className="space-y-2 text-slate-300 text-sm">
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2">1.</span>
                <span>Utiliza los controles deslizantes o ingresa valores numéricos directamente</span>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2">2.</span>
                <span>Observa los indicadores de progreso y las clasificaciones en tiempo real</span>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2">3.</span>
                <span>Analiza la gráfica de barras para comparar parámetros</span>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2">4.</span>
                <span>Experimenta con "Valores Aleatorios" o "Restablecer" para explorar diferentes escenarios</span>
              </div>
            </div>

            <hr className="border-slate-600/50 my-6" />

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-slate-300 text-sm">
              <strong className="text-yellow-400">Aviso Importante:</strong> Esta es una herramienta educativa con fines demostrativos. Las clasificaciones y evaluaciones son aproximadas y no sustituyen análisis profesionales de laboratorio certificado.
            </div>
          </div>
        </div>
      </div>

      {/* Estilos adicionales para los sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(6, 182, 212, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.3);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default ParametrosQuimicos;