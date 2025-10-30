# 🚀 Aruma Algorithm MVP

**Data-driven beauty marketing intelligence platform**

![Version](https://img.shields.io/badge/version-1.0.0-ff006b)
![Status](https://img.shields.io/badge/status-MVP-success)
![License](https://img.shields.io/badge/license-Proprietary-blue)

---

## 📋 Descripción

El **Aruma Algorithm** es una plataforma que unifica datos de diversas fuentes digitales para identificar microcomportamientos, emociones e intenciones de compra dentro de la categoría beauty. Optimiza la inversión publicitaria mediante decisiones automatizadas basadas en señales de data, tendencias y engagement.

### 🎯 Capas del Algoritmo

1. **📊 Capa de Data**: Identifica señales de búsqueda, tendencia, intención y emoción
2. **🎯 Capa de Decisión**: Analiza señales y define estrategia
3. **⚡ Capa de Ejecución**: Implementa campañas en tiempo real
4. **📈 Capa de Optimización**: Evalúa resultados y redistribuye inversión

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS** (branding Aruma)
- **Recharts** para visualizaciones
- **Lucide React** para iconos

### Scrapers
- **Python 3.10** con `pytrends` para Google Trends
- **Node.js 18** con `axios` + `cheerio` para TikTok y Meta

### Infraestructura
- **GitHub** (repositorio + versionado)
- **GitHub Actions** (CI/CD automático cada hora)
- **Netlify** (hosting + deploy continuo)

---

## 📦 Instalación Rápida

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

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` y agregar tu `META_ACCESS_TOKEN`

### 4. Ejecutar localmente

```bash
# Dashboard en desarrollo
npm run dev

# Probar scrapers
cd scrapers
python google_trends.py
node tiktok_scraper.js
node meta_scraper.js
```

---

## 🚀 Deploy a Producción

### GitHub Actions (Automático)

El proyecto está configurado para ejecutar scrapers **cada hora** automáticamente via GitHub Actions.

#### Setup:

1. **Agregar SECRET en GitHub**:
   - Ve a: `Settings` → `Secrets and variables` → `Actions`
   - Click `New repository secret`
   - Name: `META_ACCESS_TOKEN`
   - Value: `tu_token_de_meta`

2. **Verificar workflow**:
   - Ve a la pestaña `Actions`
   - Verás el workflow "Scrape Beauty Data"
   - Se ejecuta automáticamente cada hora o puedes ejecutarlo manualmente

### Netlify Deploy

#### Opción A: Deploy con CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### Opción B: Conectar desde Netlify Dashboard

1. Ve a [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Conecta tu repo de GitHub
4. Netlify detectará automáticamente la configuración de `netlify.toml`
5. Click "Deploy"

**Build settings** (auto-detectados):
- Build command: `npm run build`
- Publish directory: `dist`

---

## 📊 Fuentes de Datos

### ✅ Datos Reales (Automatizados)

| Fuente | Método | Frecuencia | Status |
|--------|--------|------------|--------|
| **Google Trends** | pytrends API | Cada hora | ✅ Activo |
| **TikTok Creative Center** | Web scraping | Cada hora | ✅ Activo |
| **Meta Graph API** | Graph API | Cada hora | ✅ Activo |

### 📋 Datos Mock (Para demostración)

| Fuente | Archivo | Status |
|--------|---------|--------|
| **Google Analytics 4** | `data/mock/ga4_data.json` | 📊 Mock |
| **Google Ads** | `data/mock/google_ads_data.json` | 📊 Mock |

**Nota**: Los datos mock serán reemplazados por integraciones reales una vez que Aruma proporcione acceso a sus cuentas.

---

## 📁 Estructura del Proyecto

```
aruma-algorithm-mvp/
├── .github/workflows/          # CI/CD
│   └── scrape-data.yml        # Ejecuta scrapers cada hora
├── scrapers/                   # Scripts de recolección de datos
│   ├── google_trends.py       # Scraper Google Trends
│   ├── tiktok_scraper.js      # Scraper TikTok
│   ├── meta_scraper.js        # Scraper Meta Graph API
│   ├── requirements.txt       # Dependencias Python
│   └── package.json           # Dependencias Node
├── data/                       # Datos recopilados
│   ├── trends/                # Google Trends
│   ├── tiktok/                # TikTok
│   ├── meta/                  # Meta
│   └── mock/                  # Datos simulados
├── src/                        # Frontend React
│   ├── components/
│   │   ├── Dashboard.jsx      # Dashboard principal
│   │   ├── DataLayer.jsx      # Capa 1: Data
│   │   ├── DecisionLayer.jsx  # Capa 2: Decisión
│   │   ├── ExecutionLayer.jsx # Capa 3: Ejecución
│   │   └── OptimizationLayer.jsx # Capa 4: Optimización
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env.example               # Variables de entorno
├── .gitignore
├── netlify.toml               # Config Netlify
├── package.json
├── tailwind.config.js         # Branding Aruma
├── vite.config.js
└── README.md
```

---

## 🎨 Branding Aruma

### Colores

```javascript
{
  aruma: {
    pink: '#FF006B',      // Rosa vibrante principal
    magenta: '#E1006F',   // Magenta oscuro
    purple: '#764BA2',    // Púrpura
    blue: '#667EEA',      // Azul
    light: '#FFE5F0',     // Rosa claro
  }
}
```

### Gradientes

- **Principal**: `linear-gradient(135deg, #FF006B 0%, #764BA2 100%)`
- **Light**: `linear-gradient(135deg, #FFE5F0 0%, #E1D5F8 100%)`

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo
npm run build           # Build para producción
npm run preview         # Preview del build

# Scrapers
cd scrapers
python google_trends.py # Ejecutar scraper de Google Trends
node tiktok_scraper.js  # Ejecutar scraper de TikTok
node meta_scraper.js    # Ejecutar scraper de Meta

# Deploy
netlify deploy --prod   # Deploy a producción
```

---

## 📈 Métricas del MVP

### Fuentes de Datos Integradas
- ✅ 3 fuentes automatizadas (Google Trends, TikTok, Meta)
- 📊 2 fuentes mock (GA4, Google Ads)

### Actualizaciones
- ⏰ Cada hora automáticamente
- 🔄 Se puede ejecutar manualmente desde GitHub Actions

### Signal Score
- Agregación automática de 4 subcapas
- Escala 0-10 basada en engagement, tendencia e intención

---

## 🛣️ Roadmap Post-MVP

### Fase 2: Integraciones Completas
- [ ] Integrar GA4 real (requiere acceso Aruma)
- [ ] Integrar Google Ads API (requiere acceso Aruma)
- [ ] Integrar Meta Ads Manager (requiere permisos)
- [ ] Agregar DV360 y PMax

### Fase 3: Automatización Avanzada
- [ ] Reglas automáticas de redistribución de presupuesto
- [ ] Alertas en tiempo real por Slack/Email
- [ ] Exportación de reportes PDF

### Fase 4: Machine Learning
- [ ] Predicción de tendencias
- [ ] Recomendaciones automáticas de campañas
- [ ] Optimización de Signal Score con ML

---

## 👥 Equipo

**Desarrollado por**: Reset  
**Cliente**: Aruma Peru  
**Versión**: 1.0.0 - MVP  
**Fecha**: Enero 2025

---

## 📞 Soporte

Para preguntas o problemas técnicos:
- 📧 Email: alonso.ternero@reset.com.pe
- 📱 GitHub Issues: [github.com/alonsix6/aruma-algorithm-mvp/issues](https://github.com/alonsix6/aruma-algorithm-mvp/issues)

---

## 📄 Licencia

Este proyecto es propiedad de **Aruma Peru** y **Reset**. Todos los derechos reservados.

---

**¡Listo para revolucionar el marketing de beauty con data! 💄📊✨**
