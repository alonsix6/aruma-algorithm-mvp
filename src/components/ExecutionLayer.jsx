import { Zap, PlayCircle, DollarSign, Activity } from 'lucide-react';

export default function ExecutionLayer() {
  const campaigns = [
    {
      name: 'Beauty - Skincare Search',
      status: 'running',
      platform: 'Google Ads',
      budget: 5200,
      spent: 4850,
      impressions: 95000,
      clicks: 5700,
      conversions: 380,
      roas: 3.8,
      ctr: 6.0,
      cpc: 0.91
    },
    {
      name: 'Beauty - TikTok Dermo',
      status: 'running',
      platform: 'TikTok',
      budget: 3800,
      spent: 3200,
      impressions: 125000,
      clicks: 5000,
      conversions: 280,
      roas: 2.9,
      ctr: 4.0,
      cpc: 0.76
    },
    {
      name: 'Beauty - PMax Skincare',
      status: 'running',
      platform: 'Google PMax',
      budget: 3800,
      spent: 3650,
      impressions: 65000,
      clicks: 3550,
      conversions: 196,
      roas: 3.4,
      ctr: 5.5,
      cpc: 1.07
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Campañas en Ejecución</h3>
            <p className="text-sm text-gray-600">{campaigns.length} campañas activas multi-plataforma</p>
          </div>
        </div>

        <div className="space-y-4">
          {campaigns.map((camp, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-xl p-5 hover:border-green-300 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">{camp.name}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {camp.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{camp.platform}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">ROAS</p>
                  <p className="text-3xl font-bold text-green-600">{camp.roas}x</p>
                </div>
              </div>

              {/* Budget Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Presupuesto gastado</span>
                  <span className="font-semibold">
                    S/ {camp.spent.toLocaleString()} / S/ {camp.budget.toLocaleString()}
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
                  <p className="font-bold text-gray-900">S/ {camp.cpc}</p>
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
            <p className="text-white/80 text-sm mb-1">Inversión Total Hoy</p>
            <p className="text-4xl font-bold">S/ 11.7K</p>
            <p className="text-green-200 text-sm mt-2">+18% vs ayer</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-1">Conversiones</p>
            <p className="text-4xl font-bold">856</p>
            <p className="text-green-200 text-sm mt-2">+23% vs ayer</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-1">ROAS Promedio</p>
            <p className="text-4xl font-bold">3.4x</p>
            <p className="text-green-200 text-sm mt-2">+0.3 vs objetivo</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
            <p className="text-white/80 text-sm mb-1">Revenue</p>
            <p className="text-4xl font-bold">S/ 39.8K</p>
            <p className="text-green-200 text-sm mt-2">+25% vs ayer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
