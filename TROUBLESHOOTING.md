# 🔧 CYBERCLICKER - SOLUCIÓN DE PROBLEMAS

## 🚨 **ERRORES COMUNES Y SOLUCIONES**

### **📋 PROBLEMA: GitHub Pages no se activa**

#### **🔍 Síntomas:**
- No aparece la opción GitHub Pages en Settings
- Error "GitHub Pages is not available for this repository"

#### **✅ Soluciones:**
1. **Verificar repositorio público:**
   ```bash
   # El repositorio debe ser público para GitHub Pages gratuito
   ```

2. **Verificar nombre del branch:**
   ```bash
   git branch -M main  # Cambiar a 'main'
   ```

3. **Activar en Settings:**
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / `(root)`

---

### **📋 PROBLEMA: GitHub Actions falla**

#### **🔍 Síntomas:**
- Badge rojo en Actions
- Error "workflow run failed"

#### **✅ Soluciones:**
1. **Verificar permisos:**
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

2. **Verificar archivo workflow:**
   ```yaml
   # Archivo debe estar en: .github/workflows/deploy.yml
   ```

3. **Ejecutar manualmente:**
   - Actions → Deploy CyberClicker → Run workflow

---

### **📋 PROBLEMA: Archivos no cargan (404)**

#### **🔍 Síntomas:**
- "404 - File not found"
- CSS/JS no se cargan

#### **✅ Soluciones:**
1. **Verificar rutas relativas:**
   ```html
   <!-- Correcto -->
   <link rel="stylesheet" href="./styles.css">
   <!-- Incorrecto -->
   <link rel="stylesheet" href="/styles.css">
   ```

2. **Verificar nombres de archivos:**
   ```bash
   # Los nombres son case-sensitive
   mobile.html ≠ Mobile.html
   ```

3. **Esperar propagación:**
   ```
   GitHub Pages puede tardar hasta 10 minutos en actualizar
   ```

---

### **📋 PROBLEMA: Manifest.json error**

#### **🔍 Síntomas:**
- PWA no se instala
- Error en console sobre manifest

#### **✅ Soluciones:**
1. **Verificar rutas de iconos:**
   ```json
   {
     "icons": [
       {
         "src": "assets/icon.svg",
         "sizes": "192x192",
         "type": "image/svg+xml"
       }
     ]
   }
   ```

2. **Verificar sintaxis JSON:**
   ```bash
   # Usar validador JSON online
   ```

---

### **📋 PROBLEMA: Service Worker no funciona**

#### **🔍 Síntomas:**
- No funciona offline
- No aparece opción "Instalar app"

#### **✅ Soluciones:**
1. **Verificar HTTPS:**
   ```
   Service Workers solo funcionan en HTTPS
   GitHub Pages usa HTTPS automáticamente
   ```

2. **Verificar registro:**
   ```javascript
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('./sw.js');
   }
   ```

---

### **📋 PROBLEMA: QR Generator no funciona**

#### **🔍 Síntomas:**
- QR no se genera
- Error en console

#### **✅ Soluciones:**
1. **Verificar CDN:**
   ```html
   <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
   ```

2. **Verificar URL base:**
   ```javascript
   // Verificar que la URL sea correcta
   console.log(window.location.host);
   ```

---

## 🛠️ **COMANDOS DE DIAGNÓSTICO**

### **🔍 Verificar estado Git:**
```bash
git status
git log --oneline -5
git remote -v
```

### **🔍 Verificar archivos:**
```bash
ls -la
ls -la .github/workflows/
```

### **🔍 Verificar URLs:**
```bash
# Tu URL debería ser:
https://TU-USUARIO.github.io/cyberclicker-game/mobile.html
```

---

## 📱 **PROBLEMAS ESPECÍFICOS DE MÓVIL**

### **📋 PROBLEMA: Juego no responde en móvil**

#### **✅ Soluciones:**
1. **Verificar eventos táctiles:**
   ```javascript
   element.addEventListener('touchstart', handler, {passive: false});
   ```

2. **Verificar viewport:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
   ```

### **📋 PROBLEMA: Texto muy pequeño**

#### **✅ Soluciones:**
1. **Verificar CSS móvil:**
   ```css
   @media (max-width: 768px) {
     .game-title { font-size: 1.4rem; }
   }
   ```

---

## 🚀 **SOLUCIÓN RÁPIDA UNIVERSAL**

### **🎯 Si nada funciona:**

1. **Crear nuevo repositorio:**
   ```bash
   # Nuevo repo público: cyberclicker-game
   ```

2. **Subir solo archivos esenciales:**
   ```bash
   # Subir: mobile.html, styles.css, game.js
   ```

3. **Activar GitHub Pages:**
   ```
   Settings → Pages → main branch
   ```

4. **Acceder directamente:**
   ```
   https://TU-USUARIO.github.io/cyberclicker-game/mobile.html
   ```

---

## 📞 **OBTENER AYUDA**

### **🔍 Información útil para reportar problemas:**
- URL de tu repositorio
- URL de GitHub Pages (si funciona)
- Mensaje de error exacto
- Navegador y dispositivo
- Screenshots del error

### **📱 Test URLs:**
```
✅ Prueba directa: mobile.html (descarga)
✅ Prueba local: http://localhost:8000/mobile.html
✅ Prueba GitHub: https://tu-usuario.github.io/repo/mobile.html
```

---

## ✅ **CHECKLIST DE VERIFICACIÓN**

- [ ] Repositorio es público
- [ ] Archivos están en branch main
- [ ] GitHub Pages activado en Settings
- [ ] URLs relativas (con ./)
- [ ] Nombres de archivos correctos
- [ ] Manifest.json válido
- [ ] Service Worker registrado
- [ ] Mobile.html funciona directamente

---

¡Si sigues teniendo problemas, el archivo `mobile.html` siempre funciona descargándolo directamente! 📱⚡