# 🚀 CyberClicker - Guía de Despliegue Completa

## 📱 **ACCESO INMEDIATO PARA MÓVIL**

### 🎯 **Enlaces Directos:**

#### **Versión Móvil Optimizada:**
📲 `mobile.html` - Versión específica para dispositivos móviles

#### **Versión Escritorio:**
💻 `index.html` - Versión completa para PC/Mac

#### **Launcher:**
🚀 `launcher.html` - Página de introducción

#### **QR Generator:**
📱 `qr-generator.html` - Genera códigos QR para acceso rápido

---

## 🌐 **OPCIÓN 1: GITHUB PAGES (RECOMENDADO)**

### **Pasos para Activar GitHub Pages:**

1. **🔗 Crea un repositorio en GitHub:**
   ```bash
   # Navega a GitHub.com y crea un nuevo repositorio
   # Nombre sugerido: cyberclicker-game
   ```

2. **📁 Sube los archivos:**
   ```bash
   git remote add origin https://github.com/TU-USUARIO/cyberclicker-game.git
   git branch -M main
   git push -u origin main
   ```

3. **⚙️ Configura GitHub Pages:**
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Guarda los cambios

4. **🎉 ¡Listo! Tu juego estará en:**
   ```
   https://TU-USUARIO.github.io/cyberclicker-game/mobile.html
   ```

### **🎯 URLs que tendrás:**
- **Móvil:** `https://tu-usuario.github.io/cyberclicker-game/mobile.html`
- **Escritorio:** `https://tu-usuario.github.io/cyberclicker-game/index.html`
- **QR Generator:** `https://tu-usuario.github.io/cyberclicker-game/qr-generator.html`

---

## 📱 **OPCIÓN 2: EXPO APP NATIVA**

### **🛠️ Setup Expo:**

1. **📱 Instala Expo Go en tu móvil:**
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **💻 Ejecuta en tu computadora:**
   ```bash
   cd CyberClickerApp
   npx expo start
   ```

3. **📷 Escanea el QR con Expo Go**

### **🚀 Para publicar en las tiendas:**
```bash
# Configurar EAS
npm install -g @expo/cli
expo login
expo build:android  # Para Google Play
expo build:ios      # Para App Store
```

---

## 🌍 **OPCIÓN 3: NETLIFY (ALTERNATIVA)**

### **Deploy en Netlify:**

1. **🔗 Ve a [netlify.com](https://netlify.com)**
2. **📁 Arrastra la carpeta del proyecto**
3. **⚡ Deploy instantáneo**

### **O con Git:**
```bash
# Conecta tu repo de GitHub con Netlify
# Deploy automático en cada commit
```

---

## 🔧 **OPCIÓN 4: SERVIDOR LOCAL**

### **Para desarrollo local:**
```bash
# Servidor Python
python3 -m http.server 8000

# Servidor Node.js
npx serve .

# Servidor PHP
php -S localhost:8000
```

**Acceso:** `http://localhost:8000/mobile.html`

---

## 📱 **CÓDIGOS QR PARA ACCESO RÁPIDO**

### **🎯 Usa el generador QR incluido:**

1. **Abre:** `qr-generator.html`
2. **Selecciona:** Versión móvil
3. **Escanea:** Con la cámara de tu móvil
4. **¡Juega!** Acceso instantáneo

### **📋 Funciones del QR Generator:**
- ✅ QR automático para móvil
- ✅ QR para versión escritorio
- ✅ Copiar URL al portapapeles
- ✅ Compartir nativo en móviles
- ✅ Detección automática de GitHub Pages

---

## 🎮 **OPCIONES DE JUEGO**

### **📱 Móvil (`mobile.html`):**
- ✅ Optimizado para pantallas táctiles
- ✅ Interfaz compacta
- ✅ Prevención de zoom accidental
- ✅ Eventos táctiles nativos
- ✅ Rendimiento optimizado

### **💻 Escritorio (`index.html`):**
- ✅ Interfaz completa de 3 columnas
- ✅ Más espacio para información
- ✅ Mejor para sesiones largas
- ✅ Soporte para mouse y teclado

### **🚀 Launcher (`launcher.html`):**
- ✅ Página de bienvenida
- ✅ Redireccionamiento automático
- ✅ Información del juego

---

## 🔄 **ACTUALIZACIONES AUTOMÁTICAS**

### **GitHub Actions configurado:**
- ✅ Deploy automático a GitHub Pages
- ✅ Activación en cada commit
- ✅ Sin configuración manual

### **Para actualizar el juego:**
```bash
# Haz cambios en los archivos
git add .
git commit -m "Actualización del juego"
git push origin main
# ¡GitHub Pages se actualiza automáticamente!
```

---

## 🎯 **ENLACES IMPORTANTES**

### **📱 Para usuarios finales:**
- **Móvil:** Usar `mobile.html`
- **QR:** Usar `qr-generator.html`
- **Compartir:** Usar las funciones de compartir nativas

### **🛠️ Para desarrolladores:**
- **Código:** Ver repositorio en GitHub
- **Contribuir:** Fork + Pull Request
- **Issues:** Reportar en GitHub Issues

---

## 🔐 **CONFIGURACIÓN DE SEGURIDAD**

### **HTTPS automático en:**
- ✅ GitHub Pages
- ✅ Netlify
- ✅ Expo Publishing

### **PWA Ready:**
- ✅ Manifest configurado
- ✅ Service Worker incluido
- ✅ Instalable como app

---

## 🎉 **¡LISTO PARA JUGAR!**

### **🎯 Próximos pasos recomendados:**

1. **🌐 Subir a GitHub Pages** (más fácil)
2. **📱 Generar QR** para acceso móvil
3. **📤 Compartir** con amigos
4. **🚀 Opcional:** Publicar app nativa con Expo

### **📱 Para jugadores:**
- **Escanea el QR** → Juego instantáneo
- **Guarda en marcadores** para acceso rápido
- **Añade a pantalla de inicio** como PWA

---

¡Tu imperio ciberpunk está listo para conquistar la galaxia! 🌆⚡🚀