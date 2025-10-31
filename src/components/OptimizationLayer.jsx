import { TrendingUp, BarChart3, RefreshCw, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Tasa de conversión PEN a USD para cálculos de ROI
const PEN_TO_USD = 3.5;

export default function OptimizationLayer() {
  // Performance últimos 7 días con fechas reales y datos más aterrizados
  const performanceData = [
    { date: '25 Oct', roas: 2.1, conversions: 38, spent: 1620 },
    { date: '26 Oct', roas: 1.9, conversions: 42, spent: 1850 },
    { date: '27 Oct', roas: 2.3, conversions: 45, spent: 1720 },
    { date: '28 Oct', roas: 2.6, conversions: 51, spent: 1680 },
    { date: '29 Oct', roas: 2.4, conversions: 48, spent: 1790 },
    { date: '30 Oct', roas: 2.8, conversions: 54, spent: 1650 },
    { date: '31 Oct', roas: 2.5, conversions: 49, spent: 1740 }
  ];

  // Cálculo de ROI como multiplicador (no porcentaje)
  // ROI = Revenue / Investment
  // Ejemplo: Investment $12,000, Revenue $32,400 USD → ROI = 2.7x
  const calculateROI = (revenuePEN, investmentUSD) => {
    const revenueUSD = revenuePEN / PEN_TO_USD;
    const roi = revenueUSD / investmentUSD;
    return roi;
  };

  // ROI de 2.7x: Investment $12,000 → Revenue debe ser $32,400 USD = S/ 113,400
  const exampleRevenuePEN = 113400;
  const exampleInvestmentUSD = 12000;
  const calculatedROI = calculateROI(exampleRevenuePEN, exampleInvestmentUSD);
  const roiScore = Math.min(10, calculatedROI * 2.5).toFixed(1); // Normalizado: 2.7 * 2.5 = 6.75 ≈ 6.8

  const signalScore = {
    current: 7.2,
    previous: 6.8,
    components: [
      { name: 'ROI', score: parseFloat(roiScore), weight: 0.35, trend: 'up' },
      { name: 'CTR', score: 7.1, weight: 0.25, trend: 'up' },
      { name: 'Engagement Rate', score: 7.5, weight: 0.25, trend: 'stable' },
      { name: 'Tiempo Activo', score: 6.9, weight: 0.15, trend: 'up' }
    ]
  };

  const budgetReallocation = [
    {
      from: 'Display Network',
      to: 'Search Skincare',
      amount: 850,
      reason: 'ROAS bajo (2.9) vs alto performance (3.8)',
      impact: '+S/ 3,200 revenue proyectado'
    },
    {
      from: 'Generic Keywords',
      to: 'High-intent Keywords',
      amount: 450,
      reason: 'CTR bajo (2.1%) vs engagement alto (6.2%)',
      impact: '+180 conversiones proyectadas'
    }
  ];

  const learnings = [
    {
      insight: 'Los posts con UGC tienen 2.3x más engagement que contenido de marca',
      action: 'Priorizar creativos con testimoniales reales',
      category: 'Creatividad',
      confidence: 94
    },
    {
      insight: 'Horario óptimo: 7-9pm obtiene 45% más conversiones',
      action: 'Redistribuir 30% del presupuesto a esas horas',
      category: 'Timing',
      confidence: 91
    },
    {
      insight: 'Mobile genera 68% de conversiones con AOV 15% mayor',
      action: 'Optimizar experiencia mobile y aumentar pujas +25%',
      category: 'Dispositivo',
      confidence: 88
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Capa de Optimización - Aprendizaje Continuo
            </h2>
            <p className="text-gray-600">
              Evalúa resultados, redistribuye inversión y mejora el Signal Score automáticamente
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-sm font-medium text-blue-600">Optimizando...</span>
          </div>
        </div>
      </div>

      {/* Signal Score Evolution */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Signal Score - Evolución</h3>
            <p className="text-sm text-gray-600">Índice consolidado de performance</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-2">Signal Score Actual</p>
            <div className="flex items-end gap-4">
              <p className="text-5xl font-bold text-blue-600">{signalScore.current}</p>
              <div className="pb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  +{(signalScore.current - signalScore.previous).toFixed(1)} ↑
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs {signalScore.previous} período anterior</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-4">Componentes del Score</p>
            <div className="space-y-3">
              {signalScore.components.map((comp, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{comp.name}</span>
                    <span className="text-xs text-gray-500">({(comp.weight * 100).toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{comp.score}</span>
                    <span className={`text-xs ${
                      comp.trend === 'up' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {comp.trend === 'up' ? '↑' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">Performance Últimos 7 Días</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="roas" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI Calculation Explanation */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Cálculo de ROI - Inversión en USD, Revenue en PEN
        </h3>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-4">
          <p className="text-white/90 text-sm mb-3">
            📊 <strong>Fórmula:</strong> ROI = ((Revenue en S/ ÷ {PEN_TO_USD}) - Inversión en $) ÷ Inversión en $ × 100
          </p>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white/70 text-xs mb-1">Inversión</p>
              <p className="text-2xl font-bold">$ {exampleInvestmentUSD.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white/70 text-xs mb-1">Revenue</p>
              <p className="text-2xl font-bold">S/ {exampleRevenuePEN.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white/70 text-xs mb-1">ROI</p>
              <p className="text-2xl font-bold text-green-300">{calculatedROI.toFixed(1)}%</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/80 text-xs">
              💱 Tasa de conversión: S/ {PEN_TO_USD} = $ 1.00 USD
            </p>
            <p className="text-white/80 text-xs mt-1">
              💰 Revenue en USD: $ {(exampleRevenuePEN / PEN_TO_USD).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-white/80 text-xs mt-1">
              ✅ Ganancia neta: $ {((exampleRevenuePEN / PEN_TO_USD) - exampleInvestmentUSD).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <p className="text-white/80 text-sm">
          Este cálculo asegura que comparamos manzanas con manzanas: convertimos los ingresos en soles a dólares
          antes de calcular el ROI, permitiendo una evaluación precisa del retorno de inversión.
        </p>
      </div>

      {/* Budget Reallocation */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Redistribución de Inversión</h3>
            <p className="text-sm text-gray-600">Movimientos automáticos basados en performance</p>
          </div>
        </div>

        <div className="space-y-4">
          {budgetReallocation.map((move, idx) => (
            <div key={idx} className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-gray-600 font-medium">{move.from}</span>
                    <span className="text-purple-600 font-bold">→</span>
                    <span className="text-sm text-purple-700 font-bold">{move.to}</span>
                  </div>
                  <p className="text-xs text-gray-600">{move.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">$ {move.amount}</p>
                  <p className="text-xs text-gray-500">redistribuido</p>
                </div>
              </div>
              <div className="pt-3 border-t border-purple-200">
                <p className="text-sm text-green-700 font-semibold">📊 {move.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learnings & Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Aprendizajes Clave</h3>
            <p className="text-sm text-gray-600">Insights automáticos para optimización futura</p>
          </div>
        </div>

        <div className="space-y-4">
          {learnings.map((learning, idx) => (
            <div key={idx} className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-bold">
                    {learning.category}
                  </span>
                  <h4 className="font-bold text-gray-900 mt-2 mb-1">{learning.insight}</h4>
                  <p className="text-sm text-orange-700 font-medium">→ {learning.action}</p>
                </div>
                <div className="ml-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center border-4 border-white">
                    <span className="text-lg font-bold text-orange-600">{learning.confidence}</span>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-1">confianza</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Summary */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" />
          Impacto de la Optimización
        </h3>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-white/80 text-sm mb-2">Mejora en ROAS</p>
            <p className="text-4xl font-bold">+32%</p>
            <p className="text-green-200 text-sm mt-2">vs período inicial</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-white/80 text-sm mb-2">Ahorro en CPA</p>
            <p className="text-4xl font-bold">-18%</p>
            <p className="text-green-200 text-sm mt-2">$ 2.8K ahorrados</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-white/80 text-sm mb-2">Conversiones Extra</p>
            <p className="text-4xl font-bold">+245</p>
            <p className="text-green-200 text-sm mt-2">por optimización</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <p className="text-sm text-white/80">
            🎯 <span className="font-semibold">Próxima optimización automática</span> en 45 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
