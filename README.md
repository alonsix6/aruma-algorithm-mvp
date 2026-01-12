# Aruma Algorithm MVP

**Plataforma de inteligencia de marketing beauty basada en datos**

![Version](https://img.shields.io/badge/version-1.0.0-ff006b)
![Status](https://img.shields.io/badge/status-MVP-success)
![License](https://img.shields.io/badge/license-Proprietary-blue)

---

## Descripcion

El **Aruma Algorithm** es una plataforma que unifica datos de diversas fuentes digitales para identificar microcomportamientos, emociones e intenciones de compra dentro de la categoria beauty. Optimiza la inversion publicitaria mediante decisiones automatizadas basadas en senales de data, tendencias y engagement.

### Las 4 Capas del Algoritmo

| Capa | Nombre | Descripcion | Componente |
|------|--------|-------------|------------|
| 1 | **Capa de Data** | Identifica senales de busqueda, tendencia, intencion y emocion | `DataLayer.jsx` |
| 2 | **Capa de Decision** | Analiza senales y define estrategia con recomendaciones automaticas | `DecisionLayer.jsx` |
| 3 | **Capa de Ejecucion** | Implementa y monitorea campanas en tiempo real | `ExecutionLayer.jsx` |
| 4 | **Capa de Optimizacion** | Evalua resultados, redistribuye inversion y mejora Signal Score | `OptimizationLayer.jsx` |

---

## Stack Tecnologico

### Frontend (Dashboard)
| Tecnologia | Version | Uso |
|------------|---------|-----|
| React | 18.2.0 | Framework UI |
| Vite | 5.0.8 | Build tool y servidor de desarrollo |
| Tailwind CSS | 3.3.6 | Estilos con branding Aruma |
| Recharts | 2.10.0 | Graficos y visualizaciones |
| Lucide React | 0.294.0 | Iconos |
| date-fns | 2.30.0 | Manejo de fechas |

### Scrapers (Recoleccion de Datos)
| Scraper | Lenguaje | Libreria | Estado |
|---------|----------|----------|--------|
| Google Trends | Python 3.10 | pytrends | Activo (con fallback a datos curados) |
| TikTok | Node.js 18 | axios | Datos curados manualmente |
| Meta/Facebook | Node.js 18 | fs/promises | Datos curados manualmente |

### Infraestructura
| Servicio | Uso |
|----------|-----|
| GitHub | Repositorio + versionado |
| GitHub Actions | CI/CD automatico **semanal** (lunes 9 AM UTC) |
| Netlify | Hosting + deploy continuo |

---

## Instalacion

### 1. Clonar repositorio

```bash
git clone https://github.com/alonsix6/aruma-algorithm-mvp.git
cd aruma-algorithm-mvp
```

### 2. Instalar dependencias

```bash
# Frontend
npm install

# Scrapers
cd scrapers
pip install -r requirements.txt
npm install
cd ..
```

### 3. Configurar variables de entorno (opcional)

```bash
cp .env.example .env
```

> **Nota:** Las variables de entorno son opcionales ya que los scrapers actualmente usan datos curados y no requieren tokens de API.

### 4. Ejecutar localmente

```bash
# Dashboard en desarrollo
npm run dev

# Probar scrapers individualmente
cd scrapers
python google_trends.py
node tiktok_scraper.js
node meta_scraper.js
```

---

## Deploy a Produccion

### GitHub Actions (Automatico)

El proyecto esta configurado para ejecutar scrapers **cada lunes a las 9 AM UTC** automaticamente via GitHub Actions.

**Configuracion del cron:**
```yaml
schedule:
  - cron: '0 9 * * 1'  # Lunes 9 AM UTC
```

#### Setup:

1. **Agregar SECRET en GitHub** (opcional, actualmente no requerido):
   - Ve a: `Settings` > `Secrets and variables` > `Actions`
   - Click `New repository secret`
   - Name: `META_ACCESS_TOKEN`
   - Value: `tu_token_de_meta`

2. **Verificar workflow**:
   - Ve a la pestana `Actions`
   - Veras el workflow "Scrape Beauty Data - Aruma Algorithm"
   - Se ejecuta automaticamente cada lunes o puedes ejecutarlo manualmente

### Netlify Deploy

#### Opcion A: Deploy con CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### Opcion B: Conectar desde Netlify Dashboard

1. Ve a [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Conecta tu repo de GitHub
4. Netlify detectara automaticamente la configuracion de `netlify.toml`
5. Click "Deploy"

**Build settings** (auto-detectados):
- Build command: `npm run build`
- Publish directory: `dist`

---

## Fuentes de Datos

### Datos Automatizados

| Fuente | Metodo Real | Frecuencia | Descripcion |
|--------|-------------|------------|-------------|
| **Google Trends** | pytrends API con fallback a datos curados | Semanal | Obtiene tendencias de busqueda para keywords de beauty en Peru. Si pytrends falla (rate limit), usa datos curados. |
| **TikTok** | Datos curados de TikTok Creative Center | Semanal | Hashtags, views, engagement basados en observacion manual del Creative Center publico. |
| **Meta/Facebook** | Datos curados de paginas y grupos publicos | Semanal | Topics de beauty con engagement scores basados en analisis manual de paginas publicas verificadas. |

### Datos Mock (Para demostracion)

| Fuente | Archivo | Descripcion |
|--------|---------|-------------|
| **Google Analytics 4** | `public/data/mock/ga4_data.json` | Datos simulados de conversion, usuarios, top pages |
| **Google Ads** | `public/data/mock/google_ads_data.json` | Datos simulados de campanas |

> **Importante:** Los datos de TikTok y Meta/Facebook son **curados manualmente** basandose en observacion de fuentes publicas. No requieren tokens de API ni acceso a cuentas personales. Los datos mock seran reemplazados por integraciones reales una vez que Aruma proporcione acceso a sus cuentas.

---

## Estructura del Proyecto

```
aruma-algorithm-mvp/
├── .github/
│   └── workflows/
│       └── scrape-data.yml        # CI/CD - Ejecuta scrapers cada lunes 9 AM UTC
├── data/                          # Datos recopilados por scrapers
│   ├── trends/                    # Google Trends (latest.json + historicos)
│   ├── tiktok/                    # TikTok (latest.json + historicos)
│   ├── meta/                      # Meta/Facebook (latest.json + historicos)
│   └── mock/                      # Datos simulados (GA4, Google Ads)
├── docs/                          # Documentacion tecnica adicional
│   ├── ANALISIS_DATOS_Y_MEJORAS.md    # Analisis de estado actual y mejoras necesarias
│   └── SCRAPERS_GUIDE.md              # Guia detallada de como funcionan los scrapers
├── public/
│   └── data/                      # Copia de datos para servir en frontend
│       ├── trends/
│       ├── tiktok/
│       ├── meta/
│       └── mock/
├── scrapers/                      # Scripts de recoleccion de datos
│   ├── google_trends.py           # Scraper Google Trends (Python)
│   ├── tiktok_scraper.js          # Curador TikTok (Node.js)
│   ├── meta_scraper.js            # Curador Meta/Facebook (Node.js)
│   ├── requirements.txt           # Dependencias Python (pytrends, pandas)
│   └── package.json               # Dependencias Node (axios)
├── src/                           # Frontend React
│   ├── components/
│   │   ├── Dashboard.jsx          # Dashboard principal con navegacion por capas
│   │   ├── DataLayer.jsx          # Capa 1: Data (busqueda, tendencia, intencion, emocion)
│   │   ├── DecisionLayer.jsx      # Capa 2: Decision (recomendaciones, audiencias)
│   │   ├── ExecutionLayer.jsx     # Capa 3: Ejecucion (campanas, reglas automaticas)
│   │   └── OptimizationLayer.jsx  # Capa 4: Optimizacion (Signal Score, ROI, learnings)
│   ├── App.jsx                    # Componente raiz
│   ├── main.jsx                   # Entry point React
│   └── index.css                  # Estilos globales Tailwind
├── .env.example                   # Variables de entorno de ejemplo
├── .gitignore
├── index.html                     # HTML principal
├── netlify.toml                   # Configuracion Netlify
├── package.json                   # Dependencias y scripts npm
├── postcss.config.js              # Configuracion PostCSS para Tailwind
├── tailwind.config.js             # Configuracion Tailwind con branding Aruma
├── vite.config.js                 # Configuracion Vite
└── README.md
```

---

## Componentes en Detalle

### Dashboard.jsx (Componente Principal)

**Funcionalidades:**
- Navegacion entre las 4 capas del algoritmo
- Estado de loading con animacion
- Timestamp de ultima actualizacion (auto-actualiza cada minuto)
- Header con branding Aruma
- Footer con indicador de sistema activo

**Estados:**
- `activeLayer`: Controla que capa se muestra ('data', 'decision', 'execution', 'optimization')
- `loading`: Estado de carga inicial
- `lastUpdate`: Timestamp de ultima actualizacion

### DataLayer.jsx (Capa de Data)

**Funcionalidades principales:**
- Carga datos de las 4 fuentes (trends, tiktok, meta, ga4) desde archivos JSON
- Calcula **Signal Scores** dinamicamente:
  - Score de Busqueda: Promedio de interes de Google Trends / 10
  - Score de Tendencia: Promedio de relevance de TikTok / 10
  - Score de Intencion: Tasa de conversion GA4 * 200
  - Score de Emocion: Promedio de engagement de Meta
  - Score Global: Promedio de los 4 scores
- Genera **Insights automaticos** conectando datos de multiples fuentes
- Secciones **expandibles/colapsables** para cada fuente
- **Auto-refresh** cada 24 horas
- Muestra metadata de cada fuente (timestamp, metodo, region)

**Fuentes de datos:**
1. Google Trends (Busqueda) - 9 keywords de beauty
2. TikTok (Tendencia) - 12 hashtags trending
3. Meta/Facebook (Emocion) - 8 topics con engagement
4. Google Analytics 4 (Intencion) - Metricas de conversion mock

### DecisionLayer.jsx (Capa de Decision)

**Funcionalidades:**
- Recomendaciones estrategicas con prioridad (alta/media)
- Audiencias personalizadas configuradas
- Sugerencias de creatividad
- Niveles de confianza por recomendacion

**Datos mostrados (mock):**
- 4 recomendaciones con impacto proyectado
- 3 audiencias con tamanho y engagement rate
- 2 creatividades sugeridas

### ExecutionLayer.jsx (Capa de Ejecucion)

**Funcionalidades:**
- Campanas activas multi-plataforma
- Barra de progreso de presupuesto
- Metricas en tiempo real (impresiones, clicks, CTR, CPC, conversiones)
- Reglas automaticas de optimizacion
- Panel de performance en tiempo real

**Datos mostrados (mock):**
- 4 campanas (Google Ads, TikTok Ads, Google PMax, Display Network)
- 3 reglas automaticas activas
- Metricas de inversion y revenue

### OptimizationLayer.jsx (Capa de Optimizacion)

**Funcionalidades:**
- Evolucion del Signal Score con grafico de linea (Recharts)
- Componentes del score con pesos
- **Calculo de ROI** con conversion PEN a USD (tasa 3.5)
- Redistribucion automatica de presupuesto
- Aprendizajes clave con niveles de confianza
- Panel de impacto de optimizacion

**Formula de ROI:**
```
ROI = (Revenue en S/ / 3.5) / Inversion en $
Ejemplo: S/ 113,400 revenue, $12,000 inversion = 2.7x ROI
```

---

## Scrapers en Detalle

### 1. Google Trends (`google_trends.py`)

**Como funciona:**
1. Intenta conectar con pytrends API (API no oficial de Google Trends)
2. Procesa keywords en batches de 5 (limite de Google Trends)
3. Obtiene: interes promedio, tendencia, regiones top, queries relacionadas
4. Si falla (rate limit, bloqueo), usa **datos curados de fallback**

**Keywords configuradas:**
```python
BEAUTY_KEYWORDS = [
    'skincare', 'cerave', 'niacinamide',
    'retinol', 'maquillaje', 'protector solar',
    'serum facial', 'hidratante', 'limpiador facial'
]
```

**Output:** `data/trends/latest.json`, `data/trends/trends_YYYYMMDD_HHMMSS.json`

### 2. TikTok (`tiktok_scraper.js`)

**Como funciona:**
- **NO hace scraping real** - TikTok Creative Center requiere JS rendering
- Usa datos **curados manualmente** basados en observacion del Creative Center publico
- Incluye hashtags globales y especificos de Peru

**Datos curados:**
- 12 hashtags con views, posts, growth, relevance score
- 2 sounds trending
- 2 categorias de creators

**Output:** `data/tiktok/latest.json`, `data/tiktok/tiktok_YYYYMMDD.json`

### 3. Meta/Facebook (`meta_scraper.js`)

**Como funciona:**
- **NO usa Meta Graph API** - Evita dependencia de tokens personales
- Usa datos **curados manualmente** basados en observacion de:
  - Paginas publicas verificadas (Makeup Peru, Astrid Cerna, Unique Peru, etc.)
  - Grupos publicos de beauty en Peru
  - Hashtags de Instagram publico

**Fuentes verificadas:**
- Makeup Peru (96,489 likes - Verified)
- Astrid Cerna Makeup (2.5M followers - International Makeup Artist)
- Influencers: Mafer Benites (1.3M TikTok), Maria Jose Vega

**Output:** `data/meta/latest.json`, `data/meta/meta_YYYYMMDD.json`

---

## Branding Aruma

### Colores Principales

```javascript
colors: {
  aruma: {
    pink: '#FF006B',      // Rosa vibrante principal
    magenta: '#E1006F',   // Magenta oscuro
    purple: '#764BA2',    // Purpura
    blue: '#667EEA',      // Azul
    light: '#FFE5F0',     // Rosa claro
    dark: '#2D0F3D',      // Oscuro
  },
  // Colores semanticos
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
}
```

### Gradientes

```javascript
backgroundImage: {
  'gradient-aruma': 'linear-gradient(135deg, #FF006B 0%, #764BA2 100%)',
  'gradient-aruma-light': 'linear-gradient(135deg, #FFE5F0 0%, #E1D5F8 100%)',
}
```

### Sombras Personalizadas

```javascript
boxShadow: {
  'aruma': '0 20px 50px rgba(255, 0, 107, 0.15)',
  'aruma-lg': '0 30px 60px rgba(255, 0, 107, 0.25)',
}
```

---

## Comandos Utiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo (puerto 5173)
npm run build            # Build para produccion
npm run preview          # Preview del build local

# Scrapers
cd scrapers
python google_trends.py  # Ejecutar scraper de Google Trends
node tiktok_scraper.js   # Ejecutar curador de TikTok
node meta_scraper.js     # Ejecutar curador de Meta

# Ejecutar todos los scrapers
./run_scrapers.sh        # Script para ejecutar los 3 scrapers

# Deploy
netlify deploy --prod    # Deploy a produccion en Netlify
```

---

## Metricas del MVP

### Fuentes de Datos Integradas
- 3 fuentes automatizadas (Google Trends, TikTok, Meta)
- 2 fuentes mock (GA4, Google Ads)

### Actualizaciones
- Automatico cada lunes 9 AM UTC via GitHub Actions
- Manual disponible desde GitHub Actions UI

### Signal Score
- Agregacion automatica de 4 sub-scores
- Escala 0-10 basada en engagement, tendencia e intencion
- Calculo dinamico en frontend basado en datos cargados

---

## Limitaciones Actuales (MVP)

1. **Datos curados:** TikTok y Meta usan datos curados manualmente, no scraping en tiempo real
2. **Google Trends rate limit:** Puede fallar con 403 si hay muchos requests
3. **Sin filtros de fecha:** No se puede analizar por periodos personalizados
4. **Sin metricas de ROI real:** Falta integracion con cuentas de Ads reales
5. **Datos de Decision/Ejecucion/Optimizacion:** Son mock, no conectados a fuentes reales

---

## Roadmap Post-MVP

### Fase 2: Integraciones Reales
- [ ] Instalar y configurar pytrends correctamente
- [ ] Implementar scraping real de TikTok con Puppeteer/Apify
- [ ] Obtener acceso a Meta Graph API o CrowdTangle
- [ ] Integrar GA4 real (requiere acceso Aruma)
- [ ] Integrar Google Ads API (requiere acceso Aruma)
- [ ] Integrar Meta Ads Manager (requiere permisos)

### Fase 3: Funcionalidades Avanzadas
- [ ] Sistema de filtros de fecha (ultimos 7 dias, 30 dias, mes anterior)
- [ ] Comparacion mensual de metricas
- [ ] Metricas de ROI con inversion/revenue reales
- [ ] Archivo de configuracion JSON para keywords/hashtags sin tocar codigo
- [ ] Alertas en tiempo real por Slack/Email
- [ ] Exportacion de reportes PDF

### Fase 4: Machine Learning
- [ ] Prediccion de tendencias
- [ ] Recomendaciones automaticas de campanas
- [ ] Optimizacion de Signal Score con ML

---

## Documentacion Adicional

| Documento | Descripcion |
|-----------|-------------|
| [docs/SCRAPERS_GUIDE.md](docs/SCRAPERS_GUIDE.md) | Guia detallada de como funcionan los 3 scrapers |
| [docs/ANALISIS_DATOS_Y_MEJORAS.md](docs/ANALISIS_DATOS_Y_MEJORAS.md) | Analisis de estado actual y mejoras necesarias |

---

## Equipo

**Desarrollado por:** Reset
**Cliente:** Aruma Peru
**Version:** 1.0.0 - MVP
**Fecha:** Enero 2025

---

## Soporte

Para preguntas o problemas tecnicos:
- Email: alonso.ternero@reset.com.pe
- GitHub Issues: [github.com/alonsix6/aruma-algorithm-mvp/issues](https://github.com/alonsix6/aruma-algorithm-mvp/issues)

---

## Licencia

Este proyecto es propiedad de **Aruma Peru** y **Reset**. Todos los derechos reservados.
