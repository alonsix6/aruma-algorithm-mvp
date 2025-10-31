import { useState, useEffect } from 'react';
import { TrendingUp, Search, Target, Heart, Zap, BarChart3, Calendar } from 'lucide-react';
import DataLayer from './DataLayer';
import DecisionLayer from './DecisionLayer';
import ExecutionLayer from './ExecutionLayer';
import OptimizationLayer from './OptimizationLayer';

export default function Dashboard() {
  const [activeLayer, setActiveLayer] = useState('data');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => setLoading(false), 800);
    
    // Actualizar timestamp cada minuto
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const layers = [
    {
      id: 'data',
      name: 'Capa de Data',
      icon: Search,
      description: 'Búsqueda, Tendencia, Intención, Emoción',
      color: 'from-aruma-pink to-aruma-magenta'
    },
    {
      id: 'decision',
      name: 'Capa de Decisión',
      icon: Target,
      description: 'Análisis y definición de estrategia',
      color: 'from-aruma-magenta to-aruma-purple'
    },
    {
      id: 'execution',
      name: 'Capa de Ejecución',
      icon: Zap,
      description: 'Implementación en tiempo real',
      color: 'from-aruma-purple to-aruma-blue'
    },
    {
      id: 'optimization',
      name: 'Capa de Optimización',
      icon: TrendingUp,
      description: 'Evaluación y redistribución',
      color: 'from-aruma-blue to-aruma-magenta'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-aruma flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Cargando Aruma Algorithm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-aruma text-white shadow-aruma-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-aruma-pink" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Aruma Algorithm</h1>
                <p className="text-white/80 text-sm mt-1">
                  Data-driven beauty marketing intelligence
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-white/70 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Última actualización
                </p>
                <p className="text-sm font-medium">
                  {lastUpdate.toLocaleString('es-PE', { 
                    day: '2-digit', 
                    month: 'short', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Layer Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {layers.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayer === layer.id;
              
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
                    ${isActive 
                      ? `bg-gradient-to-r ${layer.color} text-white shadow-lg scale-105` 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold whitespace-nowrap">{layer.name}</p>
                    <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {layer.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {activeLayer === 'data' && <DataLayer />}
          {activeLayer === 'decision' && <DecisionLayer />}
          {activeLayer === 'execution' && <ExecutionLayer />}
          {activeLayer === 'optimization' && <OptimizationLayer />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2025 Aruma Algorithm MVP - Powered by Reset</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Sistema activo
              </span>
              <span className="text-aruma-pink font-semibold">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
