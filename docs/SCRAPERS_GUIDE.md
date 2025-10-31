# Guía de Scrapers - Aruma Algorithm

Esta guía explica cómo funcionan los 3 scrapers de tendencias de beauty del proyecto.

---

## 📊 Filosofía de los Scrapers

**TODOS los scrapers usan el mismo enfoque:**
- ✅ **Observación de tendencias públicas**
- ✅ **Independientes de cuentas personales**
- ✅ **Sin necesidad de tokens privados**
- ✅ **Datos curados de fuentes verificables**

**NO extraen datos de cuentas personales ni requieren autenticación privada.**

---

## 🔍 1. Google Trends Scraper

### Descripción
Extrae tendencias de búsqueda para keywords de beauty en Perú.

### Tecnología
- **Librería:** `pytrends` (API no oficial de Google Trends)
- **Idioma:** Python 3
- **Requiere Token:** ❌ NO

### Datos que proporciona
- Keywords de beauty (skincare, cerave, niacinamide, etc.)
- Interés promedio (0-100)
- Tendencia (rising, stable, falling)
- Crecimiento últimos 3 meses
- Regiones top en Perú

### Cómo ejecutarlo
```bash
# Instalar dependencias (solo primera vez)
pip3 install pytrends pandas

# Ejecutar scraper
python3 scrapers/google_trends.py
```

### Salida
- `data/trends/latest.json`
- `data/trends/trends_YYYYMMDD_HHMMSS.json`

### Limitaciones
- Google puede bloquear con 403 si hay muchos requests
- Fallback automático a datos curados cuando hay rate limit
- Datos curados basados en observación manual de Google Trends

---

## 🎵 2. TikTok Trends Scraper

### Descripción
Curador de tendencias virales de beauty en TikTok.

### Tecnología
- **Librería:** Node.js + axios
- **Idioma:** JavaScript (ES Modules)
- **Requiere Token:** ❌ NO

### Datos que proporciona
- Hashtags trending (#skincare, #cerave, #makeuptutorial)
- Views, posts, growth percentage
- Relevance score (0-100)
- Región (LATAM, Global, Peru)
- Sounds trending
- Creator categories

### Cómo ejecutarlo
```bash
# Ejecutar scraper
node scrapers/tiktok_scraper.js
```

### Salida
- `data/tiktok/latest.json`
- `data/tiktok/tiktok_YYYYMMDD.json`

### Método de curación
Los datos son curados semanalmente basándose en:
- TikTok Creative Center público
- Observación de hashtags populares
- Análisis de engagement visible
- Tendencias en región LATAM y Perú específicamente

**NO usa API de TikTok ni acceso a cuentas privadas.**

---

## 💙 3. Meta/Facebook Public Trends Scraper

### Descripción
Curador de tendencias de beauty en Facebook/Instagram público.

### Tecnología
- **Librería:** Node.js
- **Idioma:** JavaScript (ES Modules)
- **Requiere Token:** ❌ NO (antes usaba Meta Graph API, ahora NO)

### Datos que proporciona
- Topics de beauty con engagement scores
- Menciones, crecimiento, sentiment
- Top brands por categoría
- Métricas de engagement (reactions, comments, shares)
- Análisis de grupos públicos de beauty en Perú

### Cómo ejecutarlo
```bash
# Ejecutar scraper
node scrapers/meta_scraper.js
```

### Salida
- `data/meta/latest.json`
- `data/meta/meta_YYYYMMDD.json`

### Fuentes de observación
**Páginas públicas monitoreadas:**
- Unique Peru
- Natura Peru
- Saga Beauty
- Ripley Beauty
- Esika Peru
- Avon Peru

**Grupos públicos monitoreados:**
- Beauty Lovers Peru
- Skincare Peru
- Makeup Addicts Lima

**Instagram público:**
- #beautyperu
- #skincareperu
- #makeupperu
- #bellezaperu

### Método de curación
Actualización semanal (cada lunes) basada en:
- Análisis manual de ~1850 posts públicos
- Engagement observable (reactions, comments, shares)
- Tendencias en grupos públicos (~45K miembros)
- Hashtags de Instagram público

**NO usa Meta Graph API ni acceso a cuentas personales.**

### ¿Por qué no usamos Meta Graph API?

**Razones:**
1. **Tokens personales mezclan datos:** El API se conecta a tu cuenta y puede mezclar datos personales con datos de mercado
2. **Limitaciones de acceso:** Solo accede a páginas que administras o tienes permisos
3. **Dependencia de permisos:** Los permisos pueden cambiar o revocarse
4. **Confusión de fuentes:** No queda claro si los datos son de tu cuenta o del mercado general

**Solución adoptada:**
- Curación manual de tendencias públicas
- Observación directa de páginas y grupos públicos
- Método transparente y verificable
- Igual de válido para decisiones de inversión

---

## 🚀 Ejecutar Todos los Scrapers

### Opción 1: Uno por uno
```bash
python3 scrapers/google_trends.py
node scrapers/tiktok_scraper.js
node scrapers/meta_scraper.js
```

### Opción 2: Script automatizado
```bash
# Crear script para ejecutar todos
cat > run_scrapers.sh << 'EOF'
#!/bin/bash
echo "🔍 Ejecutando Google Trends..."
python3 scrapers/google_trends.py

echo ""
echo "🎵 Ejecutando TikTok..."
node scrapers/tiktok_scraper.js

echo ""
echo "💙 Ejecutando Meta..."
node scrapers/meta_scraper.js

echo ""
echo "✅ Todos los scrapers completados"
EOF

chmod +x run_scrapers.sh
./run_scrapers.sh
```

### Opción 3: Automatización con cron
```bash
# Ejecutar todos los lunes a las 9 AM
0 9 * * 1 cd /path/to/aruma-algorithm-mvp && ./run_scrapers.sh
```

---

## 📂 Estructura de Datos

### Google Trends (`data/trends/latest.json`)
```json
{
  "timestamp": "2025-10-31T07:06:30.755146",
  "region": "PE",
  "category": "Beauty & Fitness",
  "source": "Google Trends",
  "keywords": [
    {
      "keyword": "protector solar",
      "average_interest": 92,
      "trend": "rising",
      "peak_score": 100,
      "growth_3m": "+93%",
      "top_regions": {
        "Lima": 100,
        "Cusco": 78,
        "Arequipa": 75
      }
    }
  ]
}
```

### TikTok (`data/tiktok/latest.json`)
```json
{
  "timestamp": "2025-10-31T07:05:01.276Z",
  "source": "TikTok Creative Center",
  "region": "PE",
  "trends": {
    "hashtags": [
      {
        "hashtag": "#protectorsolar",
        "views": "890K",
        "posts": "5.6K",
        "growth": "+93%",
        "relevanceScore": 94,
        "region": "Peru"
      }
    ]
  }
}
```

### Meta (`data/meta/latest.json`)
```json
{
  "timestamp": "2025-10-31T13:05:19.004Z",
  "source": "Meta/Facebook Public Trends",
  "region": "Peru",
  "aggregatedTopics": [
    {
      "topic": "Protector Solar Facial",
      "mentions": 2200,
      "engagement_score": 9.2,
      "growth": "+68%",
      "sentiment": "very positive",
      "top_brands": ["La Roche-Posay", "Eucerin", "Isdin"],
      "avg_reactions": 450,
      "avg_comments": 85,
      "avg_shares": 120
    }
  ]
}
```

---

## 🔧 Troubleshooting

### Google Trends da error 403
**Causa:** Rate limit de Google
**Solución:** El scraper usa fallback automático a datos curados. Espera 1-2 horas y vuelve a intentar.

### Node scrapers no funcionan
**Causa:** Dependencias no instaladas
**Solución:**
```bash
npm install
```

### Python scraper no funciona
**Causa:** Dependencias no instaladas
**Solución:**
```bash
pip3 install pytrends pandas
```

### Datos no se actualizan en dashboard
**Causa:** Dashboard en cache
**Solución:**
```bash
# Forzar rebuild en Netlify o local
npm run build
```

---

## ✅ Validación de Datos

Todos los scrapers guardan sus datos en JSON. Para verificar que funcionan:

```bash
# Ver última actualización de cada fuente
ls -lh data/trends/latest.json
ls -lh data/tiktok/latest.json
ls -lh data/meta/latest.json

# Ver contenido resumido
cat data/trends/latest.json | jq '.keywords[] | {keyword, average_interest, trend}'
cat data/tiktok/latest.json | jq '.trends.hashtags[] | {hashtag, relevanceScore, growth}'
cat data/meta/latest.json | jq '.aggregatedTopics[] | {topic, engagement_score, growth}'
```

---

## 🎯 Mejores Prácticas

1. **Ejecuta los scrapers semanalmente** (cada lunes)
2. **No ejecutes más de 1 vez por día** Google Trends (evitar rate limit)
3. **Revisa los datos generados** antes de commitear
4. **Actualiza manualmente los datos curados** cuando observes cambios significativos
5. **Documenta las fuentes** de donde extraes las observaciones

---

## 📈 Roadmap

### Futuras mejoras:
- [ ] Scraper automático de Instagram público (sin API)
- [ ] Integración con Apify para TikTok (más datos)
- [ ] Dashboard de actualización en tiempo real
- [ ] Alertas cuando un topic crece >50% en 7 días
- [ ] Comparación histórica de tendencias

---

**¿Preguntas?** Revisa el código de cada scraper - está bien documentado con comentarios en español.
