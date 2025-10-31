# Guía: Cómo Obtener un Token Válido de Meta Graph API

El scraper de Meta requiere un **token de acceso válido** para obtener datos reales de páginas públicas de Facebook. Aquí te explico cómo obtenerlo.

---

## 📋 Prerequisitos

1. Tener una cuenta de Facebook
2. Ser administrador de al menos una página de Facebook (opcional, pero recomendado)
3. Tener una aplicación de Facebook creada en [developers.facebook.com](https://developers.facebook.com)

---

## 🚀 Opción 1: Token de Usuario de Corta Duración (1-2 horas)

**⚠️ NO RECOMENDADO para producción, solo para pruebas**

### Pasos:

1. **Ve al Graph API Explorer**
   - URL: https://developers.facebook.com/tools/explorer/

2. **Selecciona tu aplicación**
   - En el dropdown superior, selecciona tu app
   - Si no tienes una app, créala en https://developers.facebook.com/apps/

3. **Agrega permisos necesarios**
   - Click en "Get Token" > "Get User Access Token"
   - Selecciona los siguientes permisos:
     - ✅ `pages_read_engagement` - Para leer posts de páginas
     - ✅ `pages_show_list` - Para listar páginas
     - ✅ `public_profile` - Perfil público básico

4. **Genera el token**
   - Click en "Generate Access Token"
   - Acepta los permisos
   - Copia el token generado

5. **Prueba el token**
   ```bash
   curl "https://graph.facebook.com/v21.0/me?access_token=TU_TOKEN"
   ```

---

## ✅ Opción 2: Token de Usuario de Larga Duración (60 días) - RECOMENDADO

### Paso 1: Obtén un Token de Corta Duración
Sigue los pasos de la Opción 1 para obtener un token temporal.

### Paso 2: Intercámbialo por uno de Larga Duración

```bash
curl -X GET "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=TU_APP_ID&client_secret=TU_APP_SECRET&fb_exchange_token=TU_TOKEN_CORTO"
```

**Donde:**
- `TU_APP_ID`: ID de tu aplicación (encuéntralo en https://developers.facebook.com/apps/)
- `TU_APP_SECRET`: Secret de tu app (en Settings > Basic)
- `TU_TOKEN_CORTO`: El token que generaste en el Paso 1

**Respuesta:**
```json
{
  "access_token": "EAAQb22vupf4BO5...[token largo]...",
  "token_type": "bearer",
  "expires_in": 5183944  // ~60 días
}
```

### Paso 3: Guarda el Token en .env

```bash
echo "META_ACCESS_TOKEN=EAAQb22vupf4BO5...[tu token largo]..." > .env
```

---

## 🎯 Opción 3: Token de Página (No Expira) - MEJOR OPCIÓN

**Este token NO EXPIRA y es ideal para producción.**

### Pasos:

1. **Ve al Graph API Explorer**
   - URL: https://developers.facebook.com/tools/explorer/

2. **Obtén un User Access Token de Larga Duración**
   - Sigue la Opción 2 completa primero

3. **Obtén el Page Access Token**
   ```bash
   curl "https://graph.facebook.com/v21.0/me/accounts?access_token=TU_USER_TOKEN_LARGO"
   ```

   **Respuesta:**
   ```json
   {
     "data": [
       {
         "access_token": "EAAQb22vupf4BP...[PAGE TOKEN]...",
         "category": "Beauty Store",
         "name": "Tu Página",
         "id": "123456789",
         "tasks": ["ANALYZE", "ADVERTISE", "MODERATE", "CREATE_CONTENT"]
       }
     ]
   }
   ```

4. **Copia el `access_token` de tu página**
   - Este token NO EXPIRA mientras seas admin de la página
   - Guárdalo en tu `.env`:

   ```bash
   META_ACCESS_TOKEN=EAAQb22vupf4BP...[PAGE TOKEN]...
   ```

---

## 🔍 Verificar que tu Token Funciona

```bash
# Verificar información del token
curl "https://graph.facebook.com/v21.0/me?access_token=TU_TOKEN"

# Verificar permisos del token
curl "https://graph.facebook.com/v21.0/me/permissions?access_token=TU_TOKEN"

# Probar acceso a una página pública
curl "https://graph.facebook.com/v21.0/21785951839?fields=name,about&access_token=TU_TOKEN"
```

---

## 🛠️ Configurar en el Proyecto

1. **Crear archivo .env en la raíz del proyecto:**
   ```bash
   cd /path/to/aruma-algorithm-mvp
   cp .env.example .env
   ```

2. **Editar .env y agregar tu token:**
   ```env
   META_ACCESS_TOKEN=EAAQb22vupf4BP5PgvtLpReeb45tAsmgSZBPBb00JUWUvVaqpZAOgKY1fnCk8B...
   REGION=PE
   ```

3. **Ejecutar el scraper:**
   ```bash
   node scrapers/meta_scraper.js
   ```

---

## ⚠️ Errores Comunes

### Error: "Access denied"
- **Causa**: Token inválido o expirado
- **Solución**: Genera un nuevo token siguiendo la Opción 2 o 3

### Error: "Permissions error"
- **Causa**: Token sin permisos necesarios
- **Solución**: Asegúrate de agregar `pages_read_engagement` y `pages_show_list`

### Error: "Rate limit exceeded"
- **Causa**: Demasiadas requests en poco tiempo
- **Solución**: Espera unos minutos o usa un token de página

### Error: "(#803) Cannot query users by their username"
- **Causa**: Intentando acceder a un perfil personal, no una página
- **Solución**: Usa IDs de páginas públicas, no perfiles de usuario

---

## 📊 Datos Curados vs Datos Reales

**Mientras no tengas un token válido:**
- ✅ El scraper usa **datos curados** de análisis manual
- ✅ Son datos REALES de observación de páginas públicas de beauty en Perú
- ✅ Se actualizan semanalmente

**Con un token válido:**
- ✅ Datos en tiempo real de páginas de Facebook
- ✅ Engagement real (likes, comments, shares)
- ✅ Análisis de posts recientes (últimos 15 posts por página)

---

## 🔗 Enlaces Útiles

- **Graph API Explorer**: https://developers.facebook.com/tools/explorer/
- **Mis Aplicaciones**: https://developers.facebook.com/apps/
- **Documentación Graph API**: https://developers.facebook.com/docs/graph-api
- **Access Token Debugger**: https://developers.facebook.com/tools/debug/accesstoken/

---

## 💡 Tip Pro

Para que el token dure indefinidamente:
1. Usa un **Page Access Token** (Opción 3)
2. Guarda el `app_id` y `app_secret` en un lugar seguro
3. Si el token expira, repite el proceso de intercambio

**Nunca compartas tu token en repositorios públicos!** El archivo `.env` está en `.gitignore` para protegerlo.
