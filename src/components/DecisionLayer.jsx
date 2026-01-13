import { Target, Users, MessageSquare, TrendingUp, Flame, Zap, BarChart3, CheckCircle } from 'lucide-react';

export default function DecisionLayer() {
  const recommendations = [
    {
      priority: 'high',
      category: 'Audiencias',
      action: 'Expandir audiencia "CeraVe Seekers" - mostró engagement 9.2% vs 6.5% promedio',
      impact: '+S/ 12,500 revenue proyectado',
      confidence: 94
    },
    {
      priority: 'high',
      category: 'Keywords',
      action: 'Agregar "serum niacinamide" y "protector solar facial spf 50" - 3,450 búsquedas mensuales',
      impact: '+185 conversiones/mes',
      confidence: 91
    },
    {
      priority: 'medium',
      category: 'Presupuesto',
      action: 'Incrementar inversión en "Skincare Search" de $6.2K a $7.5K basado en ROAS 3.8x',
      impact: '+S/ 17,850 revenue adicional',
      confidence: 89
    },
    {
      priority: 'medium',
      category: 'Contenido',
      action: 'Duplicar creativos UGC - mostraron 2.3x más engagement que branded content',
      impact: '+42% CTR proyectado',
      confidence: 86
    }
  ];

  const audiences = [
    {
      name: 'CeraVe & Dermo Seekers',
      size: '52K',
      engagement: '9.2%',
      status: 'active',
      description: 'Usuarios con búsquedas de CeraVe, niacinamide, protector solar en últimos 14 días'
    },
    {
      name: 'Skincare Buyers - Alto Valor',
      size: '18.5K',
      engagement: '11.8%',
      status: 'active',
      description: 'Lookalike 1% de compradores con AOV > S/ 150 en últimos 30 días'
    },
    {
      name: 'TikTok Beauty Engagers',
      size: '34K',
      engagement: '8.7%',
      status: 'active',
      description: 'Interacciones con hashtags #skincare, #skintok, #beautyperu'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Capa de Decisión - Análisis Estratégico
            </h2>
            <p className="text-gray-600">
              Define qué mensaje activar, en qué momento y en qué plataforma basado en señales de data
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              IA Activa
            </span>
          </div>
        </div>
      </div>

      {/* Recomendaciones Automáticas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recomendaciones Estratégicas</h3>
            <p className="text-sm text-gray-600">Basadas en Signal Score y comportamiento actual</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className={`p-5 rounded-xl border-2 ${
              rec.priority === 'high' 
                ? 'bg-red-50 border-red-200' 
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    rec.priority === 'high'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {rec.priority === 'high' ? (
                      <><Flame className="w-3 h-3" /> ALTA</>
                    ) : (
                      <><Zap className="w-3 h-3" /> MEDIA</>
                    )}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">{rec.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Confianza</p>
                  <p className="text-lg font-bold text-purple-600">{rec.confidence}%</p>
                </div>
              </div>
              
              <p className="text-gray-900 font-medium mb-2">{rec.action}</p>
              <p className="text-sm text-green-700 font-semibold flex items-center gap-1">
                <BarChart3 className="w-4 h-4" /> {rec.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Audiencias Configuradas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Audiencias Personalizadas</h3>
            <p className="text-sm text-gray-600">Segmentación inteligente basada en comportamiento</p>
          </div>
        </div>

        <div className="grid gap-4">
          {audiences.map((aud, idx) => (
            <div key={idx} className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{aud.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{aud.description}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  {aud.status.toUpperCase()}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-6 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Tamaño</p>
                  <p className="text-xl font-bold text-gray-900">{aud.size}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Engagement Rate</p>
                  <p className="text-xl font-bold text-purple-600">{aud.engagement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mensaje Creativo */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-8 h-8" />
          <h3 className="text-2xl font-bold">Creatividad Sugerida</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-2">Video 1: Descubrimiento</p>
            <p className="text-xl font-bold">"Descubre el poder del nuevo serum CeraVe"</p>
            <p className="text-white/80 text-sm mt-3 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Para audiencia: Dermo Enthusiasts
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-2">Carrusel: Rutina completa</p>
            <p className="text-xl font-bold">"Tu rutina dermo perfecta en 3 pasos"</p>
            <p className="text-white/80 text-sm mt-3 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Para audiencia: Skincare Buyers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
