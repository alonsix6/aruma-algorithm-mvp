import { Zap, PlayCircle, DollarSign, Activity } from 'lucide-react';

export default function ExecutionLayer() {
  const campaigns = [
    {
      name: 'Skincare Search - Alto ROI',
      status: 'running',
      platform: 'Google Ads',
      budget: 6500,
      spent: 6200,
      impressions: 128000,
      clicks: 7680,
      conversions: 485,
      roas: 3.8,
      ctr: 6.0,
      cpc: 0.81
    },
    {
      name: 'TikTok - Video Dermo',
      status: 'running',
      platform: 'TikTok Ads',
      budget: 4800,
      spent: 4500,
      impressions: 185000,
      clicks: 6660,
      conversions: 245,
      roas: 2.9,
      ctr: 3.6,
      cpc: 0.68
    },
    {
      name: 'Performance Max - Skincare',
      status: 'running',
      platform: 'Google PMax',
      budget: 4500,
      spent: 4350,
      impressions: 95000,
      clicks: 4275,
      conversions: 235,
      roas: 3.2,
      ctr: 4.5,
      cpc: 1.02
    },
    {
      name: 'Display Banner - Genérico',
      status: 'paused',
      platform: 'Display Network',
      budget: 950,
      spent: 890,
      impressions: 152000,
      clicks: 456,
      conversions: 8,
      roas: 0.1,
      ctr: 0.3,
      cpc: 1.95
    }
  ];

  const autoRules = [
    {
      rule: 'Si ROAS > 2.5',
      action: 'Incrementar presupuesto +15%',
      status: 'active',
      triggered: 12,
      lastTrigger: '2h ago'
    },
    {
      rule: 'Si CPM sube +30%',
      action: 'Reducir inversión -10%',
      status: 'active',
      triggered: 3,
      lastTrigger: '1d ago'
    },
    {
      rule: 'Si CTR < 1.5%',
      action: 'Pausar grupo de anuncios',
      status: 'active',
      triggered: 5,
      lastTrigger: '8h ago'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Capa de Ejecución - Implementación en Tiempo Real
            </h2>
            <p className="text-gray-600">
              Ajuste dinámico de campañas según intención y contexto de las usuarias
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">En vivo</span>
          </div>
        </div>
      </div>

      {/* Campañas Activas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Campañas en Ejecución</h3>
              <p className="text-sm text-gray-600">{campaigns.length} campañas activas multi-plataforma</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              💰 Inversión: USD
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              💵 Revenue: PEN
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {campaigns.map((camp, idx) => (
            <div key={idx} className={`border-2 rounded-xl p-5 transition ${
              camp.status === 'paused'
                ? 'border-red-300 bg-red-50 hover:border-red-400'
                : 'border-gray-200 hover:border-green-300'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">{camp.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      camp.status === 'paused'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {camp.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{camp.platform}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">ROAS</p>
                  <p className={`text-3xl font-bold ${
                    camp.roas < 1 ? 'text-red-600' : 'text-green-600'
                  }`}>{camp.roas}x</p>
                </div>
              </div>

              {/* Budget Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Presupuesto gastado</span>
                  <span className="font-semibold">
                    $ {camp.spent.toLocaleString()} / $ {camp.budget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${(camp.spent / camp.budget) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-5 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Impresiones</p>
                  <p className="font-bold text-gray-900">{(camp.impressions / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Clicks</p>
                  <p className="font-bold text-gray-900">{camp.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CTR</p>
                  <p className="font-bold text-blue-600">{camp.ctr}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CPC</p>
                  <p className="font-bold text-gray-900">$ {camp.cpc}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversiones</p>
                  <p className="font-bold text-green-600">{camp.conversions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reglas Automáticas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Reglas Automáticas</h3>
            <p className="text-sm text-gray-600">Optimización continua sin intervención manual</p>
          </div>
        </div>

        <div className="space-y-3">
          {autoRules.map((rule, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-purple-600" />
                  <p className="font-semibold text-gray-900">{rule.rule}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  ACTIVA
                </span>
              </div>
              
              <p className="text-sm text-purple-700 font-medium ml-8">→ {rule.action}</p>
              
              <div className="flex gap-4 mt-3 ml-8 text-xs text-gray-600">
                <span>Ejecutada: {rule.triggered}x</span>
                <span>Última vez: {rule.lastTrigger}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Stats */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <DollarSign className="w-8 h-8" />
          Performance en Tiempo Real
        </h3>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-1">Inversión Total Hoy 💰</p>
            <p className="text-4xl font-bold">$ 12K</p>
            <p className="text-green-200 text-sm mt-2">+12% vs ayer</p>
            <p className="text-white/60 text-xs mt-1">USD</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-1">Conversiones</p>
            <p className="text-4xl font-bold">968</p>
            <p className="text-green-200 text-sm mt-2">+18% vs ayer</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-1">ROAS Promedio</p>
            <p className="text-4xl font-bold">2.7x</p>
            <p className="text-green-200 text-sm mt-2">+0.2 vs objetivo</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-1">Revenue 💵</p>
            <p className="text-4xl font-bold">S/ 113K</p>
            <p className="text-green-200 text-sm mt-2">+22% vs ayer</p>
            <p className="text-white/60 text-xs mt-1">PEN</p>
          </div>
        </div>
      </div>
    </div>
  );
}
