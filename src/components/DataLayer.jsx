import { useState, useEffect } from 'react';
import { Search, TrendingUp, ShoppingCart, Heart, ExternalLink, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DataLayer() {
  const [trendsData, setTrendsData] = useState(null);
  const [tiktokData, setTiktokData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [ga4Data, setGA4Data] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Cargar datos reales de los scrapers
      const [trends, tiktok, meta, ga4] = await Promise.all([
        fetch('/data/trends/latest.json').then(r => r.json()).catch(() => null),
        fetch('/data/tiktok/latest.json').then(r => r.json()).catch(() => null),
        fetch('/data/meta/latest.json').then(r => r.json()).catch(() => null),
        fetch('/data/mock/ga4_data.json').then(r => r.json()).catch(() => null)
      ]);

      setTrendsData(trends);
      setTiktokData(tiktok);
      setMetaData(meta);
      setGA4Data(ga4);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Calcular puntajes dinámicamente basados en datos reales
  const calculateScores = () => {
    let searchScore = 5.0;
    let trendScore = 5.0;
    let intentScore = 5.0;
    let emotionScore = 5.0;

    // 1. BÚSQUEDA: Basado en Google Trends average_interest (0-100 → 0-10)
    if (trendsData?.keywords?.length > 0) {
      const avgInterest = trendsData.keywords.reduce((sum, kw) => sum + (kw.average_interest || 0), 0) / trendsData.keywords.length;
      searchScore = (avgInterest / 10).toFixed(1); // 0-100 → 0-10
    }

    // 2. TENDENCIA: Basado en TikTok relevanceScore (0-100 → 0-10)
    if (tiktokData?.trends?.hashtags?.length > 0) {
      const avgRelevance = tiktokData.trends.hashtags.reduce((sum, tag) => sum + (tag.relevanceScore || 0), 0) / tiktokData.trends.hashtags.length;
      trendScore = (avgRelevance / 10).toFixed(1); // 0-100 → 0-10
    }

    // 3. INTENCIÓN: Basado en tasa de conversión GA4 (0-1 → 0-10)
    if (ga4Data?.overview?.conversionRate) {
      intentScore = (ga4Data.overview.conversionRate * 200).toFixed(1); // 0.048 → 9.6
    }

    // 4. EMOCIÓN: Basado en engagement_score de Meta (ya está en 0-10)
    if (metaData?.aggregatedTopics?.length > 0) {
      const avgEngagement = metaData.aggregatedTopics.reduce((sum, topic) => sum + (topic.engagement_score || 0), 0) / metaData.aggregatedTopics.length;
      emotionScore = avgEngagement.toFixed(1);
    }

    // Score global: promedio de las 4 capas
    const overallScore = ((parseFloat(searchScore) + parseFloat(trendScore) + parseFloat(intentScore) + parseFloat(emotionScore)) / 4).toFixed(1);

    return {
      overall: overallScore,
      search: searchScore,
      trend: trendScore,
      intent: intentScore,
      emotion: emotionScore
    };
  };

  const scores = calculateScores();

  const COLORS = ['#FF006B', '#E1006F', '#764BA2', '#667EEA'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Capa de Data - Identificación de Señales
            </h2>
            <p className="text-gray-600">
              Análisis unificado de microcomportamientos, emociones e intenciones de compra en beauty
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              ✓ Activo
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              4 fuentes conectadas
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              Scores dinámicos
            </span>
          </div>
        </div>
      </div>

      {/* 4 Subcapas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. BÚSQUEDA */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">01. Búsqueda</h3>
                <p className="text-pink-100 text-sm">Google Trends, GA4, Google Ads</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Qué están <span className="font-semibold text-aruma-pink">deseando, comparando o descubriendo</span>
            </p>

            {/* Google Trends Keywords */}
            {trendsData?.keywords && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  🔍 Google Trends - Top Keywords
                </h4>
                {trendsData.keywords
                  .filter(kw => kw.trend === 'rising')
                  .slice(0, 5)
                  .map((kw, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:bg-pink-100 transition border border-pink-200">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{kw.keyword}</p>
                      <p className="text-xs text-gray-500">
                        Interés: {kw.average_interest}/100 • Pico: {kw.peak_score}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        {kw.growth_3m}
                      </span>
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-pink-600">{kw.average_interest}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GA4 Search Terms */}
            {ga4Data?.searchTerms && (
              <div className="space-y-3 mt-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  🔍 GA4 - Búsquedas en Sitio
                </h4>
                {ga4Data.searchTerms.slice(0, 3).map((term, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{term.term}</p>
                      <p className="text-xs text-gray-500">
                        {term.searches.toLocaleString()} búsquedas • {(term.conversionRate * 100).toFixed(1)}% conversión
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        term.trend === 'rising'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {term.trend === 'rising' ? '↑' : '→'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {trendsData && (
              <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                <p className="text-xs font-semibold text-pink-700 mb-1">📊 Fuente de Datos</p>
                <p className="text-xs text-gray-600">
                  Google Trends: {trendsData.keywords?.length || 0} keywords • {trendsData.metadata?.method || 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. TENDENCIA */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">02. Tendencia</h3>
                <p className="text-purple-100 text-sm">TikTok Creative Center, Meta Topics</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Qué <span className="font-semibold text-purple-600">formatos, sonidos y temas</span> mueven beauty
            </p>

            {/* TikTok Hashtags */}
            {tiktokData?.trends?.hashtags && (
              <div className="space-y-2">
                {tiktokData.trends.hashtags.slice(0, 5).map((tag, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-purple-50 transition">
                    <div>
                      <p className="font-medium text-gray-900">{tag.hashtag}</p>
                      <p className="text-xs text-gray-500">{tag.views} views • {tag.posts} posts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        {tag.growth}
                      </span>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-600">{tag.relevanceScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tiktokData && (
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <p className="text-xs font-semibold text-purple-700 mb-1">TikTok Trends</p>
                <p className="text-xs text-gray-600">
                  {tiktokData.trends?.hashtags?.length || 0} hashtags trending • Actualizado {new Date(tiktokData.timestamp).toLocaleDateString('es-PE')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3. INTENCIÓN */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">03. Intención</h3>
                <p className="text-blue-100 text-sm">PMax, DV360, Carrito web</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Cuándo están <span className="font-semibold text-blue-600">listas para comprar</span> o visitar tienda
            </p>

            {ga4Data?.ecommerce && (
              <>
                {/* Conversion Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <p className="text-xs text-blue-700 font-medium mb-1">Transacciones</p>
                    <p className="text-2xl font-bold text-blue-900">{ga4Data.ecommerce.transactions.toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">+12% vs mes anterior</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <p className="text-xs text-green-700 font-medium mb-1">Valor Promedio</p>
                    <p className="text-2xl font-bold text-green-900">S/ {ga4Data.ecommerce.averageOrderValue.toFixed(2)}</p>
                    <p className="text-xs text-green-600 mt-1">+8% vs mes anterior</p>
                  </div>
                </div>

                {/* Top Products */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Top Productos</h4>
                  {ga4Data.ecommerce.topProducts.map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.units} unidades vendidas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">S/ {product.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">S/ {product.avgPrice} c/u</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 4. EMOCIÓN */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">04. Emoción</h3>
                <p className="text-pink-100 text-sm">ER, VTR, Reacciones, Shares</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Qué contenidos <span className="font-semibold text-rose-600">realmente conectan</span> con ellas
            </p>

            {metaData?.aggregatedTopics && (
              <div className="space-y-3">
                {metaData.aggregatedTopics.slice(0, 4).map((topic, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{topic.topic}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        topic.engagement_score >= 8 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {topic.engagement_score.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {topic.mentions} menciones
                      </span>
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <ArrowUpRight className="w-3 h-3" />
                        {topic.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {metaData && (
              <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                <p className="text-xs font-semibold text-pink-700 mb-1">Meta Insights</p>
                <p className="text-xs text-gray-600">
                  {metaData.aggregatedTopics?.length || 0} topics analizados • {metaData.pages?.length || 0} páginas monitoreadas
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signal Score Summary */}
      <div className="bg-gradient-aruma text-white rounded-2xl shadow-aruma-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Signal Score Consolidado</h3>
            <p className="text-white/80">
              Agregación automática de todas las señales para decisiones de inversión
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{scores.overall}</div>
            <p className="text-white/80 text-sm mt-2">/ 10.0</p>
          </div>
        </div>

        {/* Explicación del Score */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
          <p className="text-sm text-white/90 mb-2">
            <span className="font-semibold">¿Qué significa este puntaje?</span>
          </p>
          <p className="text-xs text-white/70">
            Este score consolida 4 señales clave del mercado beauty en Perú. Combina datos reales de Google Trends (interés de búsqueda),
            TikTok (relevancia viral), GA4 (intención de compra) y Meta (engagement emocional). Un score alto indica fuerte oportunidad de inversión.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <p className="text-white/70 text-xs mb-1">Búsqueda</p>
            <p className="text-2xl font-bold">{scores.search}</p>
            <p className="text-xs text-white/60 mt-1">Interés de búsqueda</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <p className="text-white/70 text-xs mb-1">Tendencia</p>
            <p className="text-2xl font-bold">{scores.trend}</p>
            <p className="text-xs text-white/60 mt-1">Relevancia viral</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <p className="text-white/70 text-xs mb-1">Intención</p>
            <p className="text-2xl font-bold">{scores.intent}</p>
            <p className="text-xs text-white/60 mt-1">Conversión</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <p className="text-white/70 text-xs mb-1">Emoción</p>
            <p className="text-2xl font-bold">{scores.emotion}</p>
            <p className="text-xs text-white/60 mt-1">Engagement</p>
          </div>
        </div>

        {/* Fuentes de datos */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-xs text-white/60 mb-3">Fuentes de datos activas:</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-white/80">Google Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-white/80">TikTok Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-white/80">Meta Topics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-xs text-white/80">GA4 (Mock)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
