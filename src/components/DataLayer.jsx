import { useState, useEffect } from 'react';
import { Search, TrendingUp, ShoppingCart, Heart, ChevronDown, ChevronUp, Database, Clock, MapPin, TrendingDown, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function DataLayer() {
  const [trendsData, setTrendsData] = useState(null);
  const [tiktokData, setTiktokData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [ga4Data, setGA4Data] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Estado para controlar qué secciones están expandidas
  // TODAS LAS SECCIONES EXPANDIDAS POR DEFECTO para presentación al cliente
  const [expandedSections, setExpandedSections] = useState({
    trends: true,
    tiktok: true,
    meta: true,
    ga4: true
  });

  useEffect(() => {
    loadData();

    // Auto-refresh cada 24 horas (86400000 ms)
    const autoRefreshInterval = setInterval(() => {
      loadData();
    }, 86400000);

    return () => clearInterval(autoRefreshInterval);
  }, []);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
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
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Calcular puntajes dinámicamente
  const calculateScores = () => {
    let searchScore = 5.0;
    let trendScore = 5.0;
    let intentScore = 5.0;
    let emotionScore = 5.0;

    if (trendsData?.keywords?.length > 0) {
      const avgInterest = trendsData.keywords.reduce((sum, kw) => sum + (kw.average_interest || 0), 0) / trendsData.keywords.length;
      searchScore = (avgInterest / 10).toFixed(1);
    }

    if (tiktokData?.trends?.hashtags?.length > 0) {
      const avgRelevance = tiktokData.trends.hashtags.reduce((sum, tag) => sum + (tag.relevanceScore || 0), 0) / tiktokData.trends.hashtags.length;
      trendScore = (avgRelevance / 10).toFixed(1);
    }

    if (ga4Data?.overview?.conversionRate) {
      intentScore = (ga4Data.overview.conversionRate * 200).toFixed(1);
    }

    if (metaData?.aggregatedTopics?.length > 0) {
      const avgEngagement = metaData.aggregatedTopics.reduce((sum, topic) => sum + (topic.engagement_score || 0), 0) / metaData.aggregatedTopics.length;
      emotionScore = avgEngagement.toFixed(1);
    }

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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer de actualización manual */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              📊 Datos Actualizados Manualmente - Última Actualización: 31 Oct 2025
            </h4>
            <p className="text-xs text-blue-800">
              <strong>Google Trends:</strong> 9 keywords con datos curados (pytrends instalado, fallback por rate limit de Google) •{' '}
              <strong>TikTok:</strong> 12 hashtags verificados de TikTok Creative Center (84B+ views en #skincare, #skintok) •{' '}
              <strong>Meta/Facebook:</strong> Fuentes verificadas - Makeup Perú (96K likes), Astrid Cerna (2.5M followers) •{' '}
              <strong>GA4:</strong> Datos mock para demo
            </p>
            <p className="text-xs text-blue-700 mt-2 font-medium">
              ⏰ Próxima actualización: Semanal | 🔄 Automatización completa en desarrollo (Fase 2)
            </p>
          </div>
        </div>
      </div>

      {/* Header con Scores */}
      <div className="bg-gradient-aruma text-white rounded-2xl shadow-aruma-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold">Capa de Data - Centro de Inteligencia</h2>
              <button
                onClick={loadData}
                disabled={isRefreshing}
                className={`px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all backdrop-blur-sm flex items-center gap-2 ${
                  isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Database className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Actualizando...' : 'Actualizar Data'}
              </button>
            </div>
            <p className="text-white/80 text-sm">
              Explora en detalle cada señal del mercado beauty y su impacto en decisiones de inversión
            </p>
            {lastRefresh && (
              <p className="text-white/60 text-xs mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Última actualización: {lastRefresh.toLocaleString('es-PE', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{scores.overall}</div>
            <p className="text-white/70 text-xs">Score Global</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/70 text-xs mb-1">Búsqueda</p>
            <p className="text-xl font-bold">{scores.search}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/70 text-xs mb-1">Tendencia</p>
            <p className="text-xl font-bold">{scores.trend}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/70 text-xs mb-1">Intención</p>
            <p className="text-xl font-bold">{scores.intent}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/70 text-xs mb-1">Emoción</p>
            <p className="text-xl font-bold">{scores.emotion}</p>
          </div>
        </div>
      </div>

      {/* 1. GOOGLE TRENDS - Expandible */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('trends')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition"
        >
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6" />
            <div className="text-left">
              <h3 className="text-lg font-bold">01. Google Trends - Búsqueda</h3>
              <p className="text-sm text-pink-100">
                {trendsData?.keywords?.length || 0} keywords • Score: {scores.search}/10
              </p>
            </div>
          </div>
          {expandedSections.trends ? <ChevronUp /> : <ChevronDown />}
        </button>

        {expandedSections.trends && trendsData && (
          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <h4 className="font-semibold text-pink-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Metadata del Scraping
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-pink-700 font-medium">Última actualización</p>
                  <p className="text-pink-900">{formatDate(trendsData.timestamp)}</p>
                </div>
                <div>
                  <p className="text-pink-700 font-medium">Método</p>
                  <p className="text-pink-900">{trendsData.metadata?.method || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-pink-700 font-medium">Región</p>
                  <p className="text-pink-900">{trendsData.region}</p>
                </div>
              </div>
            </div>

            {/* Cómo afecta el score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                ¿Cómo afecta este dato al Score de Búsqueda ({scores.search}/10)?
              </h4>
              <p className="text-sm text-blue-800">
                Se calcula promediando el <strong>interés de búsqueda</strong> (0-100) de todas las keywords y dividiendo entre 10.
                Keywords con mayor interés y crecimiento indican oportunidades de inversión en esos productos/categorías.
              </p>
            </div>

            {/* Tabla completa de keywords */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                📊 Todas las Keywords ({trendsData.keywords?.length})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Keyword</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Interés</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Pico</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Crecimiento</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Tendencia</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Top Región</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trendsData.keywords?.map((kw, idx) => (
                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">{idx + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{kw.keyword}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded font-semibold">
                            {kw.average_interest}/100
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">{kw.peak_score}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-green-600 font-semibold">{kw.growth_3m}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            kw.trend === 'rising' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {kw.trend === 'rising' ? '↗ Rising' : '→ Stable'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {kw.top_regions && Object.keys(kw.top_regions)[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Regiones detalladas */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🗺️ Distribución por Regiones (Top Keywords)</h4>
              <div className="grid grid-cols-2 gap-4">
                {trendsData.keywords?.slice(0, 4).map((kw, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">{kw.keyword}</p>
                    <div className="space-y-2">
                      {kw.top_regions && Object.entries(kw.top_regions).map(([region, score]) => (
                        <div key={region} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{region}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-pink-500 h-2 rounded-full"
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            <span className="text-gray-600 font-medium w-8">{score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. TIKTOK TRENDS - Expandible */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('tiktok')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6" />
            <div className="text-left">
              <h3 className="text-lg font-bold">02. TikTok Trends - Tendencia</h3>
              <p className="text-sm text-purple-100">
                {tiktokData?.trends?.hashtags?.length || 0} hashtags • Score: {scores.trend}/10
              </p>
            </div>
          </div>
          {expandedSections.tiktok ? <ChevronUp /> : <ChevronDown />}
        </button>

        {expandedSections.tiktok && tiktokData && (
          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Metadata del Scraping
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-purple-700 font-medium">Última actualización</p>
                  <p className="text-purple-900">{formatDate(tiktokData.timestamp)}</p>
                </div>
                <div>
                  <p className="text-purple-700 font-medium">Método</p>
                  <p className="text-purple-900">{tiktokData.metadata?.method || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-purple-700 font-medium">Región</p>
                  <p className="text-purple-900">{tiktokData.region}</p>
                </div>
              </div>
            </div>

            {/* Cómo afecta el score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                ¿Cómo afecta este dato al Score de Tendencia ({scores.trend}/10)?
              </h4>
              <p className="text-sm text-blue-800">
                Se calcula promediando el <strong>relevance score</strong> (0-100) de todos los hashtags y dividiendo entre 10.
                Hashtags con alto relevance y crecimiento viral indican temas que están capturando atención masiva.
              </p>
            </div>

            {/* Tabla completa de hashtags */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                🎵 Todos los Hashtags Trending ({tiktokData.trends?.hashtags?.length})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Hashtag</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Views</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Posts</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Crecimiento</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Relevance</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Región</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiktokData.trends?.hashtags?.map((tag, idx) => (
                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">{idx + 1}</td>
                        <td className="px-4 py-3 font-medium text-purple-600">{tag.hashtag}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{tag.views}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{tag.posts}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-green-600 font-semibold">{tag.growth}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-semibold">
                            {tag.relevanceScore}/100
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">{tag.region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sounds Trending */}
            {tiktokData.trends?.sounds && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">🎶 Sounds Trending</h4>
                <div className="grid grid-cols-2 gap-4">
                  {tiktokData.trends.sounds.map((sound, idx) => (
                    <div key={idx} className="bg-purple-50 rounded-lg p-4">
                      <p className="font-semibold text-purple-900">{sound.soundName}</p>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-purple-700">{sound.usage} uses</span>
                        <span className="text-green-600 font-semibold">{sound.growth}</span>
                      </div>
                      <p className="text-xs text-purple-600 mt-1">{sound.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. META/FACEBOOK - Expandible */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('meta')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 transition"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6" />
            <div className="text-left">
              <h3 className="text-lg font-bold">04. Meta/Facebook - Emoción</h3>
              <p className="text-sm text-rose-100">
                {metaData?.aggregatedTopics?.length || 0} topics • Score: {scores.emotion}/10
              </p>
            </div>
          </div>
          {expandedSections.meta ? <ChevronUp /> : <ChevronDown />}
        </button>

        {expandedSections.meta && metaData && (
          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <h4 className="font-semibold text-rose-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Metadata del Scraping
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-rose-700 font-medium">Última actualización</p>
                  <p className="text-rose-900">{formatDate(metaData.timestamp)}</p>
                </div>
                <div>
                  <p className="text-rose-700 font-medium">Método</p>
                  <p className="text-rose-900">{metaData.metadata?.method || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-rose-700 font-medium">Región</p>
                  <p className="text-rose-900">{metaData.region}</p>
                </div>
              </div>
            </div>

            {/* Fuentes monitoreadas */}
            {metaData.pages?.[0]?.metadata && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <h4 className="font-semibold text-rose-900 mb-3">📍 Fuentes Monitoreadas</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-rose-700 font-medium mb-2">Páginas FB:</p>
                    <ul className="text-rose-800 space-y-1">
                      {metaData.pages[0].metadata.pages_monitored?.slice(0, 3).map((page, idx) => (
                        <li key={idx}>• {page}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-rose-700 font-medium mb-2">Grupos FB:</p>
                    <ul className="text-rose-800 space-y-1">
                      {metaData.pages[0].metadata.groups_monitored?.map((group, idx) => (
                        <li key={idx}>• {group}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-rose-700 font-medium mb-2">Hashtags IG:</p>
                    <ul className="text-rose-800 space-y-1">
                      {metaData.pages[0].metadata.instagram_hashtags?.slice(0, 3).map((tag, idx) => (
                        <li key={idx}>• {tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-rose-600 mt-3">
                  Total posts analizados: {metaData.pages[0].metadata.total_posts_analyzed || 'N/A'}
                </p>
              </div>
            )}

            {/* Cómo afecta el score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                ¿Cómo afecta este dato al Score de Emoción ({scores.emotion}/10)?
              </h4>
              <p className="text-sm text-blue-800">
                Se calcula promediando el <strong>engagement score</strong> (0-10) de todos los topics.
                Topics con alto engagement indican que el contenido realmente conecta emocionalmente con la audiencia.
              </p>
            </div>

            {/* Tabla completa de topics */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                💙 Todos los Topics ({metaData.aggregatedTopics?.length})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Topic</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Menciones</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Engagement</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Crecimiento</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Sentiment</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Top Brands</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metaData.aggregatedTopics?.map((topic, idx) => (
                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">{idx + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{topic.topic}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{topic.mentions?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded font-semibold">
                            {topic.engagement_score}/10
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-green-600 font-semibold">{topic.growth}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            topic.sentiment === 'very positive' || topic.sentiment === 'positive'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {topic.sentiment}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700">
                          {topic.top_brands?.slice(0, 2).join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Métricas de engagement detalladas */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">📊 Métricas de Engagement Detalladas</h4>
              <div className="grid grid-cols-3 gap-4">
                {metaData.aggregatedTopics?.slice(0, 6).map((topic, idx) => (
                  <div key={idx} className="bg-rose-50 rounded-lg p-4">
                    <p className="font-semibold text-rose-900 text-sm mb-3">{topic.topic}</p>
                    {topic.avg_reactions && (
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-rose-700">Reactions:</span>
                          <span className="text-rose-900 font-semibold">{topic.avg_reactions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-rose-700">Comments:</span>
                          <span className="text-rose-900 font-semibold">{topic.avg_comments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-rose-700">Shares:</span>
                          <span className="text-rose-900 font-semibold">{topic.avg_shares}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. GA4 - Expandible */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('ga4')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            <div className="text-left">
              <h3 className="text-lg font-bold">03. Google Analytics 4 - Intención</h3>
              <p className="text-sm text-blue-100">
                Conversión • Score: {scores.intent}/10
              </p>
            </div>
          </div>
          {expandedSections.ga4 ? <ChevronUp /> : <ChevronDown />}
        </button>

        {expandedSections.ga4 && ga4Data && (
          <div className="p-6 space-y-6">
            {/* Cómo afecta el score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                ¿Cómo afecta este dato al Score de Intención ({scores.intent}/10)?
              </h4>
              <p className="text-sm text-blue-800">
                Se calcula multiplicando la <strong>tasa de conversión</strong> por 200.
                Una conversión de 4.8% se convierte en 9.6/10. Indica qué tan lista está la audiencia para comprar.
              </p>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-blue-700 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-blue-900">{ga4Data.overview?.totalUsers?.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-xs text-green-700 mb-1">Conversions</p>
                <p className="text-2xl font-bold text-green-900">{ga4Data.overview?.conversions?.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-xs text-purple-700 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-900">{(ga4Data.overview?.conversionRate * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-rose-50 rounded-lg p-4">
                <p className="text-xs text-rose-700 mb-1">Bounce Rate</p>
                <p className="text-2xl font-bold text-rose-900">{(ga4Data.overview?.bounceRate * 100).toFixed(1)}%</p>
              </div>
            </div>

            {/* Top Pages */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">📄 Top Pages por Conversión</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Page</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Views</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Time on Page</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ga4Data.topPages?.map((page, idx) => (
                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-blue-600">{page.page}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{page.views?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{page.avgTimeOnPage}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">
                            {(page.conversionRate * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Search Terms */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🔍 Búsquedas en Sitio</h4>
              <div className="space-y-2">
                {ga4Data.searchTerms?.map((term, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{term.term}</p>
                      <p className="text-xs text-gray-500">{term.searches?.toLocaleString()} búsquedas</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        term.trend === 'rising' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {term.trend}
                      </span>
                      <span className="text-blue-600 font-semibold">{(term.conversionRate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            {ga4Data.ecommerce?.topProducts && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">🛍️ Top Productos por Revenue</h4>
                <div className="grid grid-cols-3 gap-4">
                  {ga4Data.ecommerce.topProducts.map((product, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-blue-900 mb-2">{product.name}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Unidades:</span>
                          <span className="text-blue-900 font-semibold">{product.units}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Revenue:</span>
                          <span className="text-blue-900 font-semibold">S/ {product.revenue?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Precio:</span>
                          <span className="text-blue-900 font-semibold">S/ {product.avgPrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
